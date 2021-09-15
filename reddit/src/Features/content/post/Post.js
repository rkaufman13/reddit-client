import React from 'react';
import './post.css';
import ReactPlayer from 'react-player';



export const RedditImage = (props) => {
  return (
    <div className="post">
      <h2>{props.title}</h2>
      <img 
        id="preview" 
        src={props.image_url} 
        alt="placeholder"/>
    </div>
  )
};

export const RedditVideo = (props) => {
  return (
    <div className='post'>
      <h2>{props.title}</h2>
      <ReactPlayer 
        controls
        url={props.video_url}
        width='100%'
        height='50%'
        config={{
          file: {
            dashVersion: '4.0.1'
          }
        }}
      />
    </div>
  )
};

export const LoadingPost = () => {
  return (
    <div className="post">
      <div className="loader"></div>
    </div>
  )
};
