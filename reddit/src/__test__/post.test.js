import { screen, render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { RedditImage } from "../Features/content/post/Post";
import { abbreviateNumber } from "../services/reddit";
import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { handlers } from "./serverHandlers";
import { render as renderWithProviders } from "./testUtils";
import { Content } from "../Features/content/Content";

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen({
    onUnhandledRequest(req) {
      console.error(
        "Found an unhandled %s request to %s",
        req.method,
        req.url.href
      );
    },
  });
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

beforeEach(() => {});

// test test to make sure the tests are working
function sum(a, b) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

//set up some fake data

const fakeImagePostData = {
  info: {
    title: "Fake title",
    upvotes: 111111,
    display_upvotes: abbreviateNumber(123),
    comments: 5000,
    display_comments: abbreviateNumber(500),
    subreddit_url: `https://reddit.com/r/cats`,
    subreddit_prefix: "r/cats",
    permalink:
      "https://www.reddit.com/r/IllegallySmolCats/comments/px7jev/what_breed_is_my_cat/",
    post_url:
      "https://www.reddit.com/r/IllegallySmolCats/comments/px7jev/what_breed_is_my_cat/",
    url: "https://www.reddit.com//r/IllegallySmolCats/comments/px7jev/what_breed_is_my_cat/",
    date_time: "December 30, 2021",
    date: 1632839134.0,
    text: "Check out this very cute cat",
  },
  media: {
    type: "Image",
    url: "https://preview.redd.it/l7ld7ljf79q71.jpg?width=1024&auto=webp&s=ccc8f0c054f820315a440a377330e497b4eaa223",
  },
};

test("posts render with fake data", () => {
  const post = fakeImagePostData;
  const i = 1;

  render(
    <RedditImage
      key={i}
      info={post.info}
      media_url={post.media.url ? post.media.url : null}
    />
  );
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    `${fakeImagePostData.info.title}`
  );
});

test("user can click to expand a post, then click the x to hide it", async () => {
  renderWithProviders(<App />);

  const seePostButton = screen.getByRole("button");
  const closePostButton = screen.getAllByRole("button", { hidden: true });
  expect(seePostButton).toBeInTheDocument();
  userEvent.click(seePostButton);
  expect(seePostButton).not.toBeVisible();
});

test("content page renders", () => {
  render(<Content></Content>);
  screen.debug();
});