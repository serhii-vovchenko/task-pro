import { createSlice, isAction, isAnyOf } from '@reduxjs/toolkit';
import {
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard,
  getBoardThunk,
} from './operations';

const initialState = {
  boards: [],
  loading: false,
  error: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.boards = state.boards.map(board =>
          board._id === action.payload._id ? action.payload : board
        );
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter(
          board => board._id !== action.meta.arg
        );
      })
      .addCase(getBoardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(getBoardById.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBoard = action.payload;

        state.boards = state.boards.map(board =>
          board._id === updatedBoard._id
            ? { ...updatedBoard, isActive: true }
            : { ...board, isActive: false }
        );
      })
      .addMatcher(
        isAnyOf(
          getBoardThunk.pending,
          getBoardById.pending,
          addBoard.pending,
          updateBoard.pending,
          deleteBoard.pending
        ),
        state => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getBoardThunk.rejected,
          getBoardById.rejected,
          addBoard.rejected,
          updateBoard.rejected,
          deleteBoard.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const boardsReducer = boardsSlice.reducer;
