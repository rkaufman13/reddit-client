import React, { useState } from "react";
import { testData } from "../../services/data.js";
import { Post, VideoPost, LoadingPost } from "./post/Post";
import {
  redditApi,
  useGetPopularQuery,
  useGetSearchTermQuery,
} from "../../services/reddit.js";
import { useSelector } from "react-redux";
import { selectSearchTerm } from "../searchBar/searchBarSlice";


function Content() {
  const [skip, setSkip] = React.useState(true)
  const [skipMain,setSkipMain] = React.useState(false)
  const searchTerm = useSelector(selectSearchTerm);
const { data, error, isLoading, isFetching, refetch } = useGetPopularQuery({skipMain});
 const {data: searchData, error:searchError, isLoading:searchIsLoading, isUninitialized:searchIsUninitialized, isFetching:searchIsFetching} = useGetSearchTermQuery(searchTerm, {skip}); 

 const toggleSearch= ()=> {
   setSkip(!skip)
   setSkipMain(!skipMain)
 }

let postData;

postData = data;
return (
<>
<button onClick={toggleSearch}>Toggle Search</button>
{error || searchError? ( 
   <div>An error has occured!</div>
   ):
  isLoading || searchIsLoading || isFetching || searchIsFetching? (
   [1, 2, 3, 4, 5].map((x) => {
    return <LoadingPost key={x.toString()} />;
  })
  ):searchData? (
    searchData.map((post, i) => {
      if (post.content === "image") {
        return <Post key={i} image_url={post.image_url} title={post.title} />;
      }
    
      if (post.content === "reddit_video") {
        return (
          <VideoPost key={i} video_url={post.video_url} title={post.title} />
        );
      }
    })):
  data? (

postData.map((post, i) => {
  if (post.content === "image") {
    return <Post key={i} image_url={post.image_url} title={post.title} />;
  }

  if (post.content === "reddit_video") {
    return (
      <VideoPost key={i} video_url={post.video_url} title={post.title} />
    );
  }
})):<></>
 
}
</>
)
}
export default Content;
