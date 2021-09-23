import React from 'react';
import ReactPlayer from 'react-player';
import InnerHTML from 'dangerously-set-html-content';
import redditLogo from '../../../images/reddit-logo.png';
import commentsIcon from '../../../images/comments_icon.svg';
import commentsPostLogo from '../../../images/comments_post_logo.svg';
import upvotesIcon from '../../../images/upvotes_icon.svg';
import linkIcon from '../../../images/link_icon.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './post.css';
import { Carousel } from 'react-bootstrap';

const PostHeader = props => {
  return (
  <div id="header">
    <div id="metadata">
      <img id="reddit-logo-small" src={redditLogo} />
      <a href={props.info.subreddit_url} target="_blank" rel="noreferrer">{props.info.subreddit_prefix}</a>
      <span>Posted on {props.info.date_time.date} at {props.info.date_time.time}</span>
    </div>
  
  <h2>{props.info.title}</h2>
  
  </div>
  )
}

const doSomething = () => {
  console.log('hello')
}

const PostFooter = props => {
  return (
  <div id="footer">
    <div id="post_url">
      <a href={props.info.post_url} target="_blank" rel="noreferrer">Visit Post</a>
    </div>
    <div id="comments-votes">
      <div id="votes">
        <img id="comments-votes-icon" src={upvotesIcon} />
        {props.info.score}
      </div>
      <div id="comments" onClick={doSomething}>
        <img id="comments-votes-icon" src={commentsIcon} />
        {props.info.num_comments}
      </div>
    </div>
    
  </div>
  )
}

export const RedditImage = (props) => {
  return (
    <div className="post reddit-image">
      <PostHeader info={props.info} />
      <div className="media">
        <img 
          className="media"
          id="reddit-image" 
          src={props.media_url} 
          alt="placeholder"/>
      </div>
      <PostFooter info={props.info} />
        
    </div>
  )
};

export const RedditVideo = (props) => {
  return (
    <div className="post reddit-video">
      <PostHeader info={props.info} />
      <div className="media">
      <ReactPlayer 
        controls
        url={props.media_url}
        width='100%'
        height='100%'
        config={{
          file: {
            dashVersion: '4.0.1'
          }
        }}
      />
      </div>
       <PostFooter info={props.info} />
    </div>
  )
};

export const RedditComments = (props) => {
  return (
    <div className="post reddit-comments">
      <PostHeader info={props.info} />
      <img id="comments-post-logo" src={commentsPostLogo} />
      <PostFooter info={props.info} />
    </div>
  )
}

export const RedditGallery = (props) => {
  return (
    <div className="post reddit-gallery">
      <PostHeader info={props.info} />
        <div className="media">
        <Carousel>
          {
          props.image_urls.map((x, i) => {
            return (
              <Carousel.Item>
                <img 
                  key={i}
                  className="d-block w-100"
                  src={x}
                />

              </Carousel.Item>
            )
          })
          }
      </Carousel>
      </div>
      <PostFooter info={props.info} />
    </div>
  )
}

export const Oembed = (props) => {
  return (
    <div className="post oembed">
      <PostHeader info={props.info} />
      <div className="media">
        <InnerHTML html={props.html} />
      </div>
      <PostFooter info={props.info} />
    </div>
  )
}

export const Other = (props) => {
  return (
    <div className="post other">
      <PostHeader info={props.info} />
      <div className="other-media">
        <a id="external-link" href={props.info.url} target="_blank" rel="noreferrer">{props.info.url.slice(0, 25)}...<img src={linkIcon} /></a>
        <img id={props.media_url === 'backup_image' ? "reddit-logo-medium" : "preview"} src={props.media_url === 'backup_image' ? redditLogo : props.media_url} />
      </div>
      <PostFooter info={props.info} />
    </div>
  )
}

export const LoadingPost = () => {
  return (
    <div id="loading-post">
      <div class="lds-ripple"><div></div><div></div></div>
    </div>
  )
};

// const currentPage = // something calculated from ScrollPosition

// const lastResult = usePageQuery(currentPage - 1, { skip: currentPage === 1 }) // don't fetch pages before 0
// const currentResult = usePageQuery(currentPage)
// const nextResult = usePageQuery(currentPage + 1)

// const combined = useMemo(() => {
//   const arr = new Array(pageSize * (currentPage + 1))
//   for (const data of [lastResult.data, currentResult.data, nextResult.data]) {
//     if (data) {
//       arr.splice(data.offset, data.items.length, ...data.items)
//     }
//   }
//   return arr
// }, [pageSize, currentPage, lastResult.data, currentResult.data, nextResult.data])

// work with `combined` here