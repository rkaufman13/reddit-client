import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: { types: [], filter: null },
  reducers: {
    setFilter: (state, action) => {
      state.filter = state.filter === action.payload ? null : action.payload
    },
    setFilterTypes: (state, action) => {
      state.types = action.payload
    }
  },
});

export const selectFilter = (state) => state.filter.filter;
export const selectFilterTypes = state => state.filter.types;
export const { setFilter, setFilterTypes } = filterSlice.actions;
export default filterSlice.reducer;
