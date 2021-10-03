import { render, screen } from '@testing-library/react';
import { RedditImage } from '../Features/content/post/Post';
import {abbreviateNumber} from '../services/reddit'
import React from 'react';
import '@testing-library/jest-dom'

// test test to make sure the tests are working
function sum(a, b) {
    return a + b;
  }

  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  //set up some fake data
  const utcDate = {
    post:{
    data:{
      created_utc:1632839134.0
    }
    }
  }
  const fakeImagePostData = {
    info: {
        title: "Fake title",
        upvotes: 111111,
        display_upvotes: abbreviateNumber(123),
        comments: 5000,
        display_comments: abbreviateNumber(500),
        subreddit_url: `https://reddit.com/r/cats`,
        subreddit_prefix: 'r/cats',
        permalink: 'https://www.reddit.com/r/IllegallySmolCats/comments/px7jev/what_breed_is_my_cat/',
        post_url: 'https://www.reddit.com/r/IllegallySmolCats/comments/px7jev/what_breed_is_my_cat/',
        url: 'https://www.reddit.com//r/IllegallySmolCats/comments/px7jev/what_breed_is_my_cat/',
        date_time: "December 30, 2021",
        date: 1632839134.0,
        text:'Check out this very cute cat',
      },
      media: {
          type: "Image",
          url: "https://preview.redd.it/l7ld7ljf79q71.jpg?width=1024&auto=webp&s=ccc8f0c054f820315a440a377330e497b4eaa223"
      }
}


  test("posts render", ()=> {
const post = fakeImagePostData;
const i = 1;

    render (
        <RedditImage
        key={i}
        info={post.info}
        media_url={post.media.url ? post.media.url : null}
      />
    
        );
    screen.debug()
    expect(
      screen.getByRole('heading', {level: 2}))
      .toHaveTextContent(`${fakeImagePostData.info.title}`);
   

  })