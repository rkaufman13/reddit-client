import React from "react";
import { screen } from "@testing-library/react";
import App from "../Components/App";
import { setupServer } from "msw/node";
import { handlers } from "./serverHandlers";
import { render } from "./testUtils";
import { unmountComponentAtNode } from "react-dom";

let container = null;
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

test("renders app successfully", async () => {
  render(<App />);
  expect(await screen.findByText(/calm reddit/i)).toBeInTheDocument();
  const headers = await screen.findAllByRole("heading", { level: 2 });
  expect(headers.length).toEqual(25);
});
