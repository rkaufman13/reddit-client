//todo: make each post its own Component
import { useGetPopularQuery, useGetSearchTermQuery } from "../../services/reddit.js";
import { testData } from '../../services/data.js';
import { RedditImage, RedditVideo, LoadingPost } from './post/Post';
import { useSelector } from 'react-redux'
import { selectSkipMain, selectSearchTerm } from '../searchBar/searchBarSlice.js'

function Content(result) {
  
  // if (result.error) return <div>An error has occured!</div>;

  // if (result.isLoading || result.isFetching) return (
  //   [1, 2, 3, 4, 5].map((x, i) => {
  //     return <LoadingPost key={i} />
  //   })
  // )
  // To use test data instead of making an API call, comment the lines above, from const all the way to this comment, and reassign the postData variable below from data to testData.
  // Also now need to comment the lines in App.js that make the API call.
    //const data = result.data;
  const postData = testData;
  
  
  return (

    postData.map((post, i) => {
      if (post.content === 'reddit_image' ) {
        return <RedditImage
          key={i}
          image_url={post.image_url}
          title={post.title}
        />
      } 
      
      if (post.content === 'reddit_video') {
        return <RedditVideo
          key={i}
          video_url={post.video_url}
          title={post.title}
        />
      } 
    })
  )
}

export default Content;
