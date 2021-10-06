import { rest } from "msw";
import popular from "./popular.json";

const baseURL = "https://www.reddit.com";

const popularUrl = `${baseURL}/r/popular.json?raw_json=1`;

export const handlers = [
  rest.get(popularUrl, (req, res, ctx) => {
    return res(ctx.json(popular), ctx.delay(150));
  }),
];
