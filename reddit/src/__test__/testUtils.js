// import { render } from '@testing-library/react'
// import * as React from 'react'
// import { Provider } from 'react-redux'
// import { store } from '../store'

// const Providers = ({ children }) => {
//     return (
//       <Provider store={store}>
//         {children}
//       </Provider>
//     );
//   };

//   export const renderWithProviders = (ui, options) =>
//     render(ui, { wrapper: Providers, ...options });
/*the above DID NOT WORK so I'm trying a new way from the Redux docs, here:
https://redux.js.org/usage/writing-tests
but I'm leaving everything above in for now because I'm too lazy to stash it */

import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { redditApi } from "../services/reddit";
import searchTermSliceReducer from "../Features/searchBar/searchBarSlice";
import filterSliceReducer from "../Features/filter/filterSlice";
import sortSliceReducer from "../Features/sort/sortSlice";
import calmToggleSliceReducer from "../Features/calmToggle/calmToggleSlice";

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        searchTerm: searchTermSliceReducer,
        filter: filterSliceReducer,
        sort: sortSliceReducer,
        calmToggle: calmToggleSliceReducer,
        [redditApi.reducerPath]: redditApi.reducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
