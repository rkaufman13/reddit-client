import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


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
    media.type = 'reddit_video';
    media.url = post.data.media.reddit_video.dash_url;
  } else if (redditImage) {
    media.type = 'reddit_image';
    media.url = post.data.url;
  } else if (redditGif) {
    media.type = 'reddit_gif';
    media.url = post.data.url;
  } else if (redditComments) {
    media.type = 'reddit_comments';
    media.url = 'reddit_logo';
  } else if (redditGallery) {
    media.type = 'reddit_gallery';
    media.image_urls = getGalleryImages(post)
  } else if (oembed) {
    media.type = 'oembed';
    media.html = post.data.media.oembed.html;
  } else {
    media.type = 'other';
    media.url = checkAvailableImages(post)
  }
  
  return media
};

const parseData = posts => {
  return posts.map(post => {
    return {
      info: {
        title: post.data.title,
        score: post.data.score,
        num_comments: post.data.num_comments,
        subreddit: post.data.subreddit,
        post_url: post.data.url
      },
      media: getMediaDetails(post),
    }
  })
};

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
    query: (searchTerm)=>`/search.json?q=${searchTerm}&raw_json=1`,
    transformResponse: (response) => {
      return parseData(response.data.children);
    }
    })
  })
});

// Export hooks for usage in functional components
export const { useGetPopularQuery, useGetSearchTermQuery } = redditApi;