//todo: make each post its own Component
import { useGetPopularQuery, useGetSearchTermQuery } from "../../services/reddit.js";
import { testData } from '../../services/data.js';
import { RedditImage, RedditVideo, RedditComments, RedditGallery, Oembed, Other, LoadingPost } from './post/Post';
import { useSelector } from 'react-redux'
import { selectSkipMain, selectSearchTerm } from '../searchBar/searchBarSlice.js'

function Content() {
  // The value of skipSearch is based on the value of skipMain. This allows us to not have two different variable in state. When one is on, the other should be off.
  const skipMain = useSelector(selectSkipMain);
  const skipSearch = !skipMain;
  const searchTerm = useSelector(selectSearchTerm)
  const popularResult = useGetPopularQuery('', {skipMain});
  const searchResult = useGetSearchTermQuery(searchTerm, {skipSearch})

  // We can also determine the response based on the value of skipMain. This allows using the same conditional rendering below.
  const result = skipMain ? searchResult : popularResult;
    
  
  if (result.error) return <div>An error has occured!</div>;

  if (result.isLoading || result.isFetching) return (
    [1, 2, 3, 4, 5].map((x, i) => {
      return <LoadingPost key={i} />
    })
  )

  // To use test data instead of making an API call, comment the lines above, from const all the way to this comment, and reassign the postData variable below from data to testData.
  const postData = result.data;
  console.log(postData)
  
  
  return (
    <div id="content">
    {
    postData.map((post, i) => {
      if (['reddit_image', 'reddit_gif'].includes(post.media.type)) {
        return <RedditImage
          key={i}
          info={post.info}
          media_url={post.media.url}
        />
      } 
      
      if (post.media.type === 'reddit_video') {
        return <RedditVideo
          key={i}
          info={post.info}
          media_url={post.media.url}
        />
      }

      if (post.media.type === 'reddit_comments') {
        return <RedditComments 
          key={i}
          info={post.info}
        />
      }

      if (post.media.type === 'reddit_gallery') {
        return <RedditGallery 
          key={i}
          info={post.info}
          image_urls={post.media.image_urls}
        />
      }

      if (post.media.type === 'oembed') {
        return <Oembed 
          key={i}
          info={post.info}
          html={post.media.html}
        />
      }

      if (post.media.type === 'other') {
        return <Other 
          key={i}
          info={post.info}
          media_url={post.media.url}
        />
      }
    })
    }
    </div>
  )
}

export default Content;
