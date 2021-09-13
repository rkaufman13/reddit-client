import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// The contentType function checks for all available types on a post and returns the available type based on priority of type. Since a post with a video or an oembed is likely to also have a preview or thumbnail image, we check for those types first.

const contentType = post => {
  let type = '';
  const media = post.data.media;
  const preview = post.data.preview;
  const thumbnail = post.data.thumbnail;

  if (media) {
    type = Object.keys(media)[0];
  } else if (preview) {
    type = 'preview';
  } else if (thumbnail.match(/https/)) {
    type = 'thumbnail';
  }
  
  return type;
};

// The below functions take the data needed from the post based on the content type of the post. For each type of post, we can add or alter data, as needed, for the individual types of components that will be required to render each type of post properly. There is a lot of repetition here in the returned objects, will look into refactoring later.

// Also, am a bit worried about the oembed functionality. It returns html that I'm assuming we can use as an embed by parsing it, but I'm not sure if doing this will expose users to XSS attacks without taking precautions. Especially since there is a script tag in the html. There seems to be other safer options such as using the oembed URL intead, and making a request to the twitter API using the url. The returned HTML would then be coming from a trusted source. Even still, we might look into some sort of sanitization/restriction of the returned html, regardless of its origins.

// The PostVideoObject is returning an audio_url which is currently not being used in the VideoPost component. It seems a bit tricky from what I've read to connect a video html element to an audio html element. Will have to look further into that.

const videoPostObject = post => {
  const video_url = post.data.media.reddit_video.fallback_url;
  const audio_url = video_url.replace(/DASH.*\.mp4/, 'DASH_audio.mp4');
  return {
    title: post.data.title,
    content: 'reddit_video',
    video_url: video_url,
    audio_url: audio_url
  }
};

const oembedPostObject = post => {
  const html = post.data.media.oembed.html;
  return {
    title: post.data.title,
    content: 'oembed',
    html: html
  }
};

const previewPostObject = post => {
  let image_url = post.data.preview.images[0].source.url
  return {
    title: post.data.title,
    content: 'image',
    image_url: image_url
  }
};

const thumbnailPostObject = post => {
  let image_url = post.data.thumbnail
  return {
    title: post.data.title,
    content: 'image',
    image_url: image_url
  }
};

const backupPostObject = post => {
  return {
    title: post.data.title,
    content: 'image',
    image_url: null
  }
};

// The formatData function uses all of the functions listed above to map over the json response and return an appropriate object for each post based on the type of content it contains. This will make it easier to render proper components based on their type, which will be defined by the content key in each newly returned object.

const formatData = posts => {
  return posts.map(post => {
    let content = contentType(post);
  switch (content) {
    case 'reddit_video':
      return videoPostObject(post);
    case 'oembed':
      return oembedPostObject(post);
    case 'preview':
      return previewPostObject(post);
    case 'thumbnail':
      return thumbnailPostObject(post);
    default:
      return backupPostObject(post);
    }
  })
}

// Using RTK Query, we can utilize a super abstraction and have no idea what's going on, lol. Hopefully over the next few weeks we can get more familiar with how it works and break it down.

// Basically RTK Query handles caching, middleware, adds hooks to the objects it returns, etc... There's quite a lot going on. However, at face value, we have a base url that we can alter by building new endpoints. getPopular, listed below, is one of those endpoints. This will be most useful when implementing the search functionality.

// Export redditApi for use in store.js
export const redditApi = createApi({
  reducerPath: 'redditApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.reddit.com' }),
  endpoints: (builder) => ({
    getPopular: builder.query({
      query: () => '/r/popular.json?raw_json=1',
      transformResponse: (response) => {
        return formatData(response.data.children);
      }
    }),
    getSearchTerm: builder.query({
    query: (searchTerm)=>`/search.json?q=${searchTerm}`,
    transformResponse: (response) => {
      return formatData(response.data.children);
    }
    })
  })
});

// Export hooks for usage in functional components
export const { useGetPopularQuery, useGetSearchTermQuery } = redditApi;