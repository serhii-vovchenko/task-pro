import { createSlice, isAnyOf } from '@reduxjs/toolkit';
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
  reducers: {
    setActiveBoard: (state, action) => {
      state.boards.forEach(board => (board.isActive = false));
      const activeBoard = state.boards.find(
        board => board._id === action.payload
      );
      if (activeBoard) activeBoard.isActive = true;
      state.currentBoard = activeBoard;
    },
  },
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
        const boardIndex = state.boards.findIndex(
          board => board._id === action.payload
        );
        state.boards = state.boards.filter(
          board => board._id !== action.payload
        );
        if (state.boards.length === 1) {
          state.currentBoard = null;
        } else if (boardIndex === 0 && state.boards.length > 1) {
          state.currentBoard = state.boards[0];
        } else if (
          boardIndex === state.boards.length &&
          state.boards.length > 1
        ) {
          state.currentBoard = state.boards[boardIndex - 1];
        }
      })
      .addCase(getBoardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
        if (!state.currentBoard && state.boards.length > 0) {
          state.currentBoard = state.boards[0];
          state.boards[0].isActive = true;
        }
      })
      .addCase(getBoardById.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBoard = action.payload;

        state.boards = state.boards.map(board =>
          board._id === updatedBoard._id
            ? { ...board, ...updatedBoard, isActive: true }
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

export const { setActiveBoard } = boardsSlice.actions;

export const boardsReducer = boardsSlice.reducer;
