import {createSlice} from '@reduxjs/toolkit'

const showContentSlice = createSlice({
  name: 'showContent',
  initialState: {},
  reducers: {
      setContent: (state, action)=>{
          state.content=action.payload;
      },
  }
});

export const selectContent = state => state.selectContent;
export const {setContent} = showContentSlice.actions;
export default showContentSlice.reducer;