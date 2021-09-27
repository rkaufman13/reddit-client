import { useSelector,useDispatch } from 'react-redux';
import { selectSkipMain, selectSearchTerm } from '../searchBar/searchBarSlice.js';
import { useGetPopularQuery, useGetSearchTermQuery } from "../../services/reddit.js";
import { RedditImage, RedditVideo, RedditComments, RedditGallery, Oembed, Other, LoadingPost } from './post/Post';
import './content.css';
import { selectFilter, setFilterTypes } from '../filter/filterSlice.js';

export const Content = () => {
  const dispatch = useDispatch();
  const skipMain = useSelector(selectSkipMain);
  const skipSearch = !skipMain;
  const searchTerm = useSelector(selectSearchTerm);
  const filterTerm = useSelector(selectFilter);
  // const sortTerm = useSelector(selectSort);
  const popularResult = useGetPopularQuery('', {skip: skipMain});
  const searchResult = useGetSearchTermQuery(searchTerm, {skip: skipSearch});
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

  dispatch(setFilterTypes([...new Set(popularResult.data?.map(x => x.media.type))]));
  
  const result = !skipMain&&filterTerm ? filteredResult:skipMain&&!filterTerm? searchResult :skipMain&&filterTerm?filteredSearchedResult: popularResult;
  

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

  const data = result.data;
  const postData = data;

  return (
    <div id="content">
      {
      postData.map((post, i) => {
        if (['Image', 'Gif'].includes(post.media.type)) {
          return <RedditImage
            key={i}
            info={post.info}
            media_url={post.media.url?post.media.url:null}
          />
        } 
        
        if (post.media.type === 'Video') {
          return <RedditVideo
            key={i}
            info={post.info}
            media_url={post.media.url?post.media.url:null}
          />
        }

        if (post.media.type === 'Discussion') {
          return <RedditComments 
            key={i}
            info={post.info}
          />
        }

        if (post.media.type === 'Gallery') {
          return <RedditGallery 
            key={i}
            info={post.info}
            image_urls={post.media.image_urls}
          />
        }

        if (post.media.type === 'Social') {
          return <Oembed 
            key={i}
            info={post.info}
            html={post.media.html}
          />
        }

        if (post.media.type === 'Other') {
          return <Other 
            key={i}
            info={post.info}
            media_url={post.media.url?post.media.url:null}
          />
        }
        return null
      })
      }
    </div>
  )
}