import {createSlice} from '@reduxjs/toolkit';

const calmToggleSlice = createSlice({
  name: 'calmToggle',
  initialState: true,
  reducers: {
    setToggle: (state, action) => {
      return action.payload
    },
  }
});

export const selectCalmToggle = state => state.calmToggle;
export const { setToggle } = calmToggleSlice.actions;
export default calmToggleSlice.reducer;