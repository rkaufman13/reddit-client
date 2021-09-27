import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "sort",
  initialState: null,
  reducers: {
    setSort: (state, action) => {
      return state === action.payload.toLowerCase() ? null : action.payload.toLowerCase()
    },
  }
});

export const selectSort = (state) => state.sort;
export const { setSort } = sortSlice.actions;
export default sortSlice.reducer;