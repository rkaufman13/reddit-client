import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const getDate = post => {
  const date = new Date(post.data.created_utc * 1000)
  const dateString = date.toDateString()
  const timeString = date.toLocaleTimeString('en-US', {hour12: true, hour: '2-digit', minute: '2-digit'})
  return {
    date: dateString,
    time: timeString
  }
}

const abbreviateNumber = value => {
  if (value > 999) {
    var suffixes = ["", "k", "m"];
    var suffixNum = Math.floor((""+value).length/3);
    var shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
    if (shortValue % 1 !== 0) {
        shortValue = shortValue.toFixed(1);
    }
    return shortValue+suffixes[suffixNum];
  } else {
    return value;
  }
}
const getGalleryImages = post => {
  let obj = post.data.media_metadata;
  let image_urls = [];
  for (const x in obj) {
    image_urls.push(obj[x].s.u);
  }
  return image_urls
}

const checkAvailableImages = post => {
  if (post.data.preview) {
    if (post.data.preview.images[0].resolutions) {
      return post.data.preview.images[0].resolutions[0].url
    }
  }

  if (post.data.thumbnail.match(/https:\/\//)) {
    return post.data.thumbnail
  }

  return 'backup_image'
}

const checkOembed = post => {
  if (post.data.media && post.data.media.oembed) {
    return true
  }
}

const getMediaDetails = post => {
  let media = {}
  const oembed = checkOembed(post)
  const redditVideo = post.data.is_video;
  const redditImage = post.data.url.match(/https:\/\/i.redd.it\/.*\.(png|jpg)/);
  const redditGif = post.data.url.match(/https:\/\/i.redd.it\/.*\.gif/);
  const redditGallery = post.data.url.match(/https:\/\/www.reddit.com\/gallery/)
  const redditComments = post.data.url.match(/https:\/\/www.reddit.com\/r\/.*\/comments/)

  if (redditVideo) {
   media.type = 'reddit_video'
   media.url = post.data.media.reddit_video.dash_url;
  } else if (redditImage) {
    media.type = 'reddit_image'
    media.url = post.data.url;
  } else if (redditGif) {
    media.type = 'reddit_gif'
    media.url = post.data.url;
  } else if (redditComments) {
   media.type = 'reddit_comments'
    media.url = 'reddit_logo';
  } else if (redditGallery) {
    media.type ='reddit_gallery'
    media.image_urls = getGalleryImages(post)
  } else if (oembed) {
    media.type = 'oembed'
    media.html = post.data.media.oembed.html;
  } else {
    media.type = 'other'
    media.url = checkAvailableImages(post);
  }
  return media
};

const parseData = posts => {
  return posts.map(post => {
    return {
      info: {
        title: post.data.title,
        score: abbreviateNumber(post.data.score),
        num_comments: abbreviateNumber(post.data.num_comments),
        subreddit_url: `https://reddit.com/${post.data.subreddit_name_prefixed}`,
        subreddit_prefix: post.data.subreddit_name_prefixed,
        permalink: post.data.permalink,
        post_url: `https://reddit.com/${post.data.permalink}`,
        url: post.data.url,
        date_time: getDate(post)
      },
      media: getMediaDetails(post)
    }
  })
};

const parseComments = data => {
  const topLevelComments = data.filter(obj => obj.kind === 't1')
  const comments = []
  
  topLevelComments.forEach((comment, i) => {
    comments.push({})
    comments[i][i] = comment.data.body
    comments[i].replies = []
    
    if (comment.data.replies !== '') {
      let replies = comment.data.replies.data.children.filter(reply => reply.kind === 't1')
      replies.forEach(reply => {
        comments[i].replies.push(reply.data.body)
      })
    }
  })
  return comments
}

export const redditApi = createApi({
  reducerPath: 'redditApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.reddit.com' }),
  endpoints: (builder) => ({
    getPopular: builder.query({
      query: () => '/r/popular.json?raw_json=1',
      transformResponse: (response) => {
        return parseData(response.data.children);
      }
    }),
    getSearchTerm: builder.query({
    query: (searchTerm)=> `/search.json?q=${searchTerm}&raw_json=1`,
    transformResponse: (response) => {
      return parseData(response.data.children);
    }
    }),
    getComments: builder.query({
      query: (permalink)=> `${permalink}.json`,
      transformResponse: (response) => {
        return parseComments(response[1].data.children)
      }
    })
  })
});

// Export hooks for usage in functional components
export const { useGetPopularQuery, useGetSearchTermQuery, useGetCommentsQuery } = redditApi;