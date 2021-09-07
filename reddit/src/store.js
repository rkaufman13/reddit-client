import { configureStore } from '@reduxjs/toolkit';
import { redditApi } from './services/reddit';
import { searchTermReducer } from './Features/searchBar/searchBarSlice';


export const store = configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    [redditApi.reducerPath]: redditApi.reducer
  }, 


  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(redditApi.middleware)

  /* 
  An optional array of Redux middleware functions

  If this option is provided, it should contain all the middleware functions you want added to the store. configureStore will automatically pass those to applyMiddleware.

  If not provided, configureStore will call getDefaultMiddleware and use the array of middleware functions it returns.

  Where you wish to add onto or customize the default middleware, you may pass a callback function that will receive getDefaultMiddleware as its argument, and should return a middleware array.
  */
})