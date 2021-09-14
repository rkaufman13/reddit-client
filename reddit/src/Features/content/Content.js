import React from "react";
import { testData } from "../../services/data.js";
import { Post, VideoPost, LoadingPost } from "./post/Post";
import {
  useGetPopularQuery,
  useGetSearchTermQuery,
} from "../../services/reddit.js";
import { useSelector } from "react-redux";
import { selectSearchTerm,selectSkip,selectSkipMain} from "../searchBar/searchBarSlice";


function Content() {
  let skip = useSelector(selectSkip)
  let skipMain = useSelector(selectSkipMain)
  const searchTerm = useSelector(selectSearchTerm);
const { data, error, isLoading, isFetching, refetch } = useGetPopularQuery({skipMain});
 const {data: searchData, error:searchError, isLoading:searchIsLoading, isUninitialized:searchIsUninitialized, isFetching:searchIsFetching} = useGetSearchTermQuery(searchTerm, {skip}); 

 console.log(data,searchData)
let postData;
postData = data;
console.log(postData)
return (
<>
{searchError? (
  <div>An error has occured!</div>
):
searchIsLoading || searchIsFetching? (
  [1, 2, 3, 4, 5].map((x) => {
    return <LoadingPost key={x.toString()} />;
  })
):searchData?searchData.map((post, i) => {
  if (post.content === "image") {
    return <Post key={i} image_url={post.image_url} title={post.title} />;
  }

  if (post.content === "reddit_video") {
    return (
      <VideoPost key={i} video_url={post.video_url} title={post.title} />
    );
  }
  else return "<></>"
}):error? ( 
   <div>An error has occured!</div>
   ):
  isLoading || isFetching ? (
   [1, 2, 3, 4, 5].map((x) => {
    return <LoadingPost key={x.toString()} />;
  })
  ):postData?
  (
  postData.map((post, i) => {
    if (post.content === "image") {
      return <Post key={i} image_url={post.image_url} title={post.title} />;
    }
  
    if (post.content === "reddit_video") {
      return (
        <VideoPost key={i} video_url={post.video_url} title={post.title} />
      );
    }
    else return "<></>"
  })):



<></>
 
}
</>
)
}
export default Content;
