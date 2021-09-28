import { createSlice } from '@reduxjs/toolkit';

const calmToggleSlice = createSlice({
  name: 'calmToggle',
  initialState: false,
  reducers: {
    setToggle: (state, action) => {
      return action.payload
    },
  }
});

export const selectCalmToggle = state => state.calmToggle;
export const { setToggle } = calmToggleSlice.actions;
export default calmToggleSlice.reducer;