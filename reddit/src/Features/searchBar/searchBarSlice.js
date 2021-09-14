import { createSlice } from "@reduxjs/toolkit";

const searchTermSlice = createSlice({
  name: "searchTerm",
  initialState: { term: "", skip: true, skipMain: false },
  reducers: {
    setSearchTerm: (state, action) => {
      state.term = action.payload;
    },
    clearSearchTerm: (state) => {
      //this SHOULD zero out the search term (it does) and toggle the skip states of both getPopular and getSearchTerm, which I would think would cause a rerender but doesn't.
      state.term = "";
      state.skip = true;
      state.skipMain = false;
    },
    toggleSkip: (state) => {
      state.skip = !state.skip;
      state.skipMain = !state.skipMain;
    },
  },
});

export const selectSearchTerm = (state) => state.searchTerm.term;
export const selectSkip = (state) => state.searchTerm.skip;
export const selectSkipMain = (state) => state.searchTerm.skipMain;

export const { setSearchTerm, clearSearchTerm, toggleSkip } =
  searchTermSlice.actions;

export default searchTermSlice.reducer;
