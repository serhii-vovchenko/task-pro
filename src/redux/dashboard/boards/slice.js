import { createSlice } from '@reduxjs/toolkit';
import { getBoardThunk } from './operations';

const initialState = {
  boards: [],
};

const slice = createSlice({
  name: 'board',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getBoardThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBoardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(getBoardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const boardsReducer = slice.reducer;
