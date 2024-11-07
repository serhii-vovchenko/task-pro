import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  // getBoards,
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
      // .addCase(getBoards.pending, state => {
      //   state.loading = true;
      // })
      // .addCase(getBoards.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.boards = action.payload;
      // })
      // .addCase(getBoards.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })
      // .addCase(getBoardById.fulfilled, (state, action) => {
      //   state.boards = state.boards.map(board =>
      //     board.id === action.payload.id ? action.payload : board
      //   );
      // })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.boards = state.boards.map(board =>
          board.id === action.payload.id ? action.payload : board
        );
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter(
          board => board.id !== action.meta.arg
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
            ? updatedBoard
            : { ...board, isActive: false }
        );
      })

      // .addCase(editBoardById.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.boards = action.payload;
      // })

      // .addCase(deleteBoardById.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.boards = action.payload;
      // })

      .addMatcher(
        isAnyOf(
          getBoardThunk.pending,
          getBoardById.pending
          // editBoardById.pending
          // deleteBoardById.pending
        ),
        state => {
          state.loading = true;
          state.error = false;
        }
      )

      .addMatcher(
        isAnyOf(
          getBoardThunk.rejected,
          getBoardById.rejected
          // editBoardById.rejected
          // deleteBoardById.rejected
        ),
        state => {
          state.loading = false;
          state.error = true;
        }
      )

      .addMatcher(
        isAnyOf(
          getBoardThunk.fulfilled,
          getBoardById.fulfilled
          // editBoardById.rejected
          // deleteBoardById.fulfilled
        ),
        state => {
          state.loading = false;
        }
      );
  },
});

export const boardsReducer = boardsSlice.reducer;
