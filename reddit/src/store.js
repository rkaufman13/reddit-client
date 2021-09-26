import { configureStore } from '@reduxjs/toolkit';
import { redditApi } from './services/reddit';
import searchTermSliceReducer from './Features/searchBar/searchBarSlice';
import filterSliceReducer from './Features/filter/filterSlice';
import calmToggleSliceReducer from './Features/calmToggle/calmToggleSlice'
import logger from 'redux-logger';



export const store = configureStore({
  reducer: {
    searchTerm: searchTermSliceReducer,
    filter:filterSliceReducer,
    calmToggle: calmToggleSliceReducer,
    [redditApi.reducerPath]: redditApi.reducer
  }, 


  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(redditApi.middleware, logger)

})