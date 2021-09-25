import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: null,
  reducers: {
    setFilter: (state, action) => {
      return action.payload;
    },
  },
});

export const selectFilter = (state) => state.filter;
export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
