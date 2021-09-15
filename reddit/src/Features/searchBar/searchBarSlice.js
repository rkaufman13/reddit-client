import { createSlice } from '@reduxjs/toolkit';

const searchTermSlice = createSlice({
  name: "searchTerm",
  initialState: { skipMain: false, term: '' },
  reducers: {
    setSkipMain: (state, action) => {
      state.skipMain = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.term = action.payload;
    }
  }
});

export const selectSkipMain = state => state.searchTerm.skipMain;
export const selectSearchTerm = state => state.searchTerm.term;

export const { setSkipMain, setSearchTerm } = searchTermSlice.actions;
export default searchTermSlice.reducer;
