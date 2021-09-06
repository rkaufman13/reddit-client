//todo: make each post its own Component
import { useGetPopularQuery } from "../../services/reddit.js";
import { testData } from '../../services/data.js';
import { Post, VideoPost, LoadingPost } from './post/Post';


function Content() {
  const { 
    data, 
    error, 
    isLoading, 
    isFetching, 
    refetch } = useGetPopularQuery();
  
  if (error) return <div>An error has occured!</div>;

  if (isLoading) return (
    [1, 2, 3, 4, 5].map((x, i) => {
      return <LoadingPost key={i} />
    })
  )

  // To use test data instead of making an API call, comment the lines above, from const all the way to this comment, and reassign the postData variable below from data to testData.
  const postData = data;
  console.log(postData)
  
  return (
    postData.map((post, i) => {
      if (post.content === 'image' ) {
        return <Post
          key={i}
          image_url={post.image_url}
          title={post.title}
        />
      } 
      
      if (post.content === 'reddit_video') {
        return <VideoPost 
          key={i}
          video_url={post.video_url}
          title={post.title}
        />
      } 
    })
  )
}

export default Content;
