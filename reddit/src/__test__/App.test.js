import React from "react";
import { screen } from "@testing-library/react";
import { render } from "./testUtils";
import { Provider } from "react-redux";
import { store } from "../store.js";
import App from "../Components/App";
import { setupServer } from "msw/node";
import { handlers } from "./serverHandlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

beforeEach(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

test("renders app successfully", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(await screen.findByText(/calm reddit/i)).toBeInTheDocument();
});
