import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getCurrentBoard } from './operations';

const initialState = {
  currentBoard: null,
  loading: false,
  error: null,
};

const currentBoardSlice = createSlice({
  name: 'currentBoard',
  initialState,
  reducers: {
    clearCurrentBoard: state => {
      state.currentBoard = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCurrentBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoard = action.payload;
      })
      .addMatcher(isAnyOf(getCurrentBoard.pending), state => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(getCurrentBoard.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentBoard } = currentBoardSlice.actions;
export const getCurrentBoardReducer = currentBoardSlice.reducer;
