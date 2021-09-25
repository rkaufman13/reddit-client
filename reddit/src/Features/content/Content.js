import { useSelector } from 'react-redux'
import { selectSkipMain, selectSearchTerm } from '../searchBar/searchBarSlice.js'
import { useGetPopularQuery, useGetSearchTermQuery } from "../../services/reddit.js";
import { RedditImage, RedditVideo, RedditComments, RedditGallery, Oembed, Other, LoadingPost } from './post/Post';
import './content.css'
import { selectFilter } from '../filter/filterSlice.js';

function Content() {
  const skipMain = useSelector(selectSkipMain);
  const skipSearch = !skipMain;
  const searchTerm = useSelector(selectSearchTerm)
  const filterTerm = useSelector(selectFilter)
  const popularResult = useGetPopularQuery('', {skipMain});
  const searchResult = useGetSearchTermQuery(searchTerm, {skipSearch})
  const filteredResult = useGetPopularQuery('',{skip:skipMain,
    selectFromResult: ({data}) => ({
      data: data?.filter((post) => post.media?.type === filterTerm)
    }),
    }
  );
  const filteredSearchedResult = useGetSearchTermQuery(searchTerm,{skip:skipSearch,
    selectFromResult: ({data}) => ({
      data: data?.filter((post) => post.media.type === filterTerm)
    }),
    }
  );
  // We can also determine the response based on the value of skipMain. This allows using the same conditional rendering below.
  //This ternary expression may be too hard to parse, but it was fun to write. It checks for the existence of both filter & skip as suggested and sets the value of data accordingly.
  const result = !skipMain&&filterTerm ? filteredResult:skipMain&&!filterTerm? searchResult :skipMain&&filterTerm?filteredSearchedResult: popularResult;
    console.log(result)
    
// let result = null;

  if (result.isError || result.rejected) return <div>An error has occured!</div>;

  if (result.isLoading || result.isFetching) return (
    <div id="loading-content">
      {
      [...Array(25).keys()].map(x => {
        return <LoadingPost key={x} />
      })
    }
    </div>
  )
  
  // To use test data instead of making an API call, comment the lines above, from const all the way to this comment, and reassign the postData variable below from data to testData.
  // Also now need to comment the lines in App.js that make the API call.
    const data = result.data;
  const postData = data;
  
  
  return (
    <div id="content" className="row">
    {
    postData.map((post, i) => {
      if (['reddit_image', 'reddit_gif'].includes(post.media.type)) {
        return <RedditImage
          key={i}
          info={post.info}
          media_url={post.media.url?post.media.url:null}
        />
      } 
      
      if (post.media.type === 'reddit_video') {
        return <RedditVideo
          key={i}
          info={post.info}
          media_url={post.media.url?post.media.url:null}
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
          media_url={post.media.url?post.media.url:null}
        />
      }
    })
    }
    </div>
  )
}

export default Content;
