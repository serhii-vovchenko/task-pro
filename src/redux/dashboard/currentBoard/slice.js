import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getCurrentBoard } from './operations';

const initialState = {
  currentBoard: {},
  loading: false,
  error: null,
};

const currentBoardSlice = createSlice({
  name: 'currentBoard',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getCurrentBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoard = action.payload;
      })

      .addMatcher(isAnyOf(), getCurrentBoard.pending, state => {
        state.loading = true;
        state.error = false;
      })

      .addMatcher(isAnyOf(), getCurrentBoard.rejected, state => {
        state.loading = false;
        state.error = true;
      })

      .addMatcher(isAnyOf(), getCurrentBoard.fulfilled, state => {
        state.loading = false;
      });
  },
});

export const getCurrentBoardReducer = currentBoardSlice.reducer;
