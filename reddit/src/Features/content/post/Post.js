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
import { Carousel, Modal } from 'react-bootstrap';
import { useGetCommentsQuery } from '../../../services/reddit';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCalmToggle } from '../../calmToggle/calmToggleSlice';
import { Button } from 'react-bootstrap';
import marked from 'marked';


const PostHeader = props => {
  const calm = useSelector(selectCalmToggle);

  
    return (
    <>
      <div id="spacer"></div>
      <h2>{props.info.title}</h2>
    </>
    )
  

  // return (
  //   <div id="header">
  //     <div id="metadata">
  //       <img id="reddit-logo-small" src={redditLogo} alt='' />
  //       <a href={props.info.subreddit_url} target="_blank" rel="noreferrer">{props.info.subreddit_prefix}</a>
  //       <span>Posted on {props.info.date_time.date} at {props.info.date_time.time}</span>
  //     </div>
  //     <h2>{props.info.title}</h2>
  //   </div>
  // )
};

const PostBody = props => {
  let text = "";
  props.info?.text? text = marked(props.info.text):text=marked(props.info.title);

  return (
    <>
    <blockquote className="blockquote" dangerouslySetInnerHTML={{__html:text}}/><br/>
    </>
  )
}

const Comments = props => {
  
  const comments = useGetCommentsQuery(props.info.permalink)
  if (comments.error) return <h1>There was an error!</h1>
  if (comments.isLoading) return <h1>Loading...</h1>
 

  return (
    <>
    {comments.data.map((x, i) => {
      
      const renderedComment = marked(x[i]) + " <em>—" + x.author + "</em>";
      return <div>
        <hr/>
        <p id="comment" key={i} dangerouslySetInnerHTML={{__html:renderedComment}}/>
        
        <ul>
        {
          x.replies.map((x,i) => {
            const renderedReply = marked(x)
            return <li id="replies" key={i}><p style={{display:"inline"}} dangerouslySetInnerHTML={{__html:renderedReply}}/></li>
          })
        }
        </ul>
      </div>
    })}</>
  )
};

const PostFooter = props => {
  const [show, setShow] = useState(false);


  return (
    <>
      <div id="footer">
    
        <div id="comments-votes">
          <div id="votes">
            <img id="comments-votes-icon" src={upvotesIcon} alt=''/>
            {props.info.display_upvotes}
          </div>
          <div id="comments" >
            <img id="comments-votes-icon" src={commentsIcon} alt='' />
            {props.info.display_comments}
          </div>
          <div class="date">
            {props.info.date_time.date}
          </div>
        </div>
          <div id="post_url">
          <Button onClick={() => setShow(true)}>See Post</Button>
        </div>
      </div>
  
      <Modal
        show={show}
        onHide={() => setShow(false)}
        onShow={() => console.log(props)}
        contentClassName="custom-modal"
        aria-labelledby="reddit-comments"
        centered
        scrollable
      >
        <Modal.Header closeVariant="white" closeButton><Modal.Title><a href={props.info.post_url} target="_blank" rel="noreferrer">visit original post</a></Modal.Title></Modal.Header>
        <Modal.Body>
        {show ?<><PostBody info={props.info} media={props.media}/><Comments info={props.info}/></> : ''}
        </Modal.Body>
      </Modal>
    </>
  )
};

export const RedditImage = (props) => {
  return (
    <div className="post reddit-image">
      <PostHeader info={props.info} />
      <div className="media">
        <img 
          className="media"
          id="reddit-image" 
          src={props.media_url} 
          alt=''/>
      </div>
      <PostFooter info={props.info} />
    </div>
  );
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
            dashVersion: "4.0.1",
          },
        }}
      />
      </div>
       <PostFooter info={props.info} />
    </div>
  );
};

export const RedditComments = (props) => {
  return (
    
    <div className="post reddit-comments">
      <PostHeader info={props.info} />
   
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
              <Carousel.Item key={i}>
                <img 
                  key={i}
                  className="d-block w-100"
                  src={x}
                  alt=''
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
        <a id="external-link" href={props.info.url} target="_blank" rel="noreferrer">{props.info.url.slice(0, 25)}...<img src={linkIcon} alt=''/></a>
        <img id={props.media_url === 'backup_image' ? "reddit-logo-medium" : "preview"} src={props.media_url === 'backup_image' ? redditLogo : props.media_url} alt=''/>
      </div>
      <PostFooter info={props.info} />
    </div>
  )
}

export const LoadingPost = () => {
  return (
    <div id="loading-post">
      <div className="lds-ripple"><div></div><div></div></div>
    </div>
  )
};
