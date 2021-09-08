
import { testData } from "../../services/data.js";
import { Post, VideoPost, LoadingPost } from "./post/Post";
import {
  useGetPopularQuery,
  useGetSearchTermQuery,
} from "../../services/reddit.js";
import { useSelector } from "react-redux";
import { selectSearchTerm } from "../searchBar/searchBarSlice";


function Content() {

const { data, error, isLoading, isFetching, refetch } = useGetPopularQuery();
  
if (error) {
   console.log(error)
   return <div>An error has occured!</div>;}

if (isLoading)
  return [1, 2, 3, 4, 5].map((x, i) => {
    return <LoadingPost key={i} />;
  });
let postData;

// To use test data instead of making an API call, comment the lines above, from const all the way to this comment, and reassign the postData variable below from data to testData.

postData = data;
console.log(postData)

return postData.map((post, i) => {
  if (post.content === "image") {
    return <Post key={i} image_url={post.image_url} title={post.title} />;
  }

  if (post.content === "reddit_video") {
    return (
      <VideoPost key={i} video_url={post.video_url} title={post.title} />
    );
  }
});
  
}

export default Content;
