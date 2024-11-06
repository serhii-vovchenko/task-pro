import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getBoardById, getBoardThunk } from './operations';

const initialState = {
  boards: [],
  loading: false,
  error: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getBoardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(getBoardById.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBoard = action.payload;
        console.log(updatedBoard);

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
