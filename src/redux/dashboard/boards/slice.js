import { createSlice } from '@reduxjs/toolkit';
import { getBoardThunk } from './operations';

const initialState = {
  boards: [],
};

const slice = createSlice({
  name: 'boards',
  initialState,
  extraReducers: builder => {
    builder.addCase(getBoardThunk.fulfilled, (state, action) => {
      state.boards = action.payload.data;
    });
  },
});

export const boardsReducer = slice.reducer;
