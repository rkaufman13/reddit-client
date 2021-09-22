import React from 'react';

import ReactPlayer from 'react-player';
import InnerHTML from 'dangerously-set-html-content';
import './post.css';


export const RedditImage = (props) => {
  return (
    <div className="post">
      <h2>{props.info.title}</h2>
      <h2>upvotes: {props.info.score}</h2>
      <h2>comments: {props.info.num_comments}</h2>
      <img 
        id="reddit-image" 
        src={props.media_url} 
        alt="placeholder"/>
         <a href={props.info.post_url} target="_blank" rel="noreferrer">visit post</a>
    </div>
  )
};

export const RedditVideo = (props) => {
  return (
    <div className="post">
      <h2>{props.info.title}</h2>
      <h2>upvotes: {props.info.score}</h2>
      <h2>comments: {props.info.num_comments}</h2>
      <ReactPlayer 
        controls
        url={props.media_url}
        width='100%'
        height='50%'
        config={{
          file: {
            dashVersion: '4.0.1'
          }
        }}
      />
       <a href={props.info.post_url} target="_blank" rel="noreferrer">visit post</a>
    </div>
  )
};

export const RedditComments = (props) => {
  return (
    <div className="comment-post">
      <h2>{props.info.title}</h2>
      <h2>upvotes: {props.info.score}</h2>
      <h2>comments: {props.info.num_comments}</h2>
      
      <a href={props.info.post_url} target="_blank" rel="noreferrer">visit post</a>
    </div>
  )
}

export const RedditGallery = (props) => {
  return (
    <div className="post">
      <h2>{props.info.title}</h2>
      <h2>upvotes: {props.info.score}</h2>
      <h2>comments: {props.info.num_comments}</h2>
      {
        props.image_urls.map((x, i) => {
          return (
            <img key={i} src={x} />
          )
        })
      }
       <a href={props.info.post_url} target="_blank" rel="noreferrer">visit post</a>
    </div>
  )
}

export const Oembed = (props) => {
  return (
    <div className="post">
      <h2>{props.info.title}</h2>
      <h2>upvotes: {props.info.score}</h2>
      <h2>comments: {props.info.num_comments}</h2>
      <div id="container">
      <InnerHTML html={props.html} />
      </div>
      <a href={props.info.post_url} target="_blank" rel="noreferrer">visit post</a>
    </div>
  )
}

export const Other = (props) => {
  return (
    <div className="other">
      <h2>{props.info.title}</h2>
      <h2>upvotes: {props.info.score}</h2>
      <h2>comments: {props.info.num_comments}</h2>
      <img id="preview" src={props.media_url} />
      <a href={props.info.post_url} target="_blank" rel="noreferrer">visit post</a>
    </div>
  )
}

export const LoadingPost = () => {
  return (
    <div className="post">
      <div className="loader"></div>
    </div>
  )
};
