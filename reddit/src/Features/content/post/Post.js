import React from 'react';
import './post.css';
import backupImage from '../../../images/reddit-logo.png'




export const Post = (props) => {
  const image_url = props.image_url ? props.image_url : backupImage
  return (
    <div className="post">
      <img 
        id="preview" 
        src={image_url} 
        alt="placeholder"/>
        <h2>{props.title}</h2>
      </div>
  )
}

export const OembedPost = (props) => {
  // Not currently in use. Something to thinkabout.
}

export const VideoPost = (props) => {
  return (
    <div className = 'post'>
      <video width="320" height="240" controls>
        <source src={props.video_url} type="video/mp4"></source>
      </video>
      <h2>{props.title}</h2>
    </div>
  )
}

export const LoadingPost = () => {
  return (
    <div className="post">
      <div className="loader"></div>
    </div>
  )
}
