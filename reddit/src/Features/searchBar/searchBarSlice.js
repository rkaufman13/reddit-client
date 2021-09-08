import {createSlice} from '@reduxjs/toolkit'

const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState: '',
  reducers: {
    setSearchTerm: (state,action)=>{
    state.searchTerm = action.payload;
    },
    clearSearchTerm: (state,action)=>{
    state.searchTerm="";
    },
  }
});

export const selectSearchTerm = state => state.searchTerm;

export const { setSearchTerm, clearSearchTerm } = searchTermSlice.actions;

export default searchTermSlice.reducer;