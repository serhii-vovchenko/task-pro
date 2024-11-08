import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getCurrentBoard } from './operations';
import { addColumn, deleteColumn, editColumn } from '../columns/operations';
import { createTask, deleteTask, updateTask } from '../tasks/operations';

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
      .addCase(addColumn.fulfilled, (state, action) => {
        if (!state.currentBoard.columns) {
          state.currentBoard.columns = [action.payload];
        } else {
          state.currentBoard.columns.push(action.payload);
        }
      })
      .addCase(editColumn.fulfilled, (state, action) => {
        state.currentBoard.columns = state.currentBoard.columns.map(item =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.currentBoard.columns = state.currentBoard.columns.filter(
          item => item._id !== action.payload
        );
      })
      .addCase(createTask.fulfilled, (state, action) => {
        // const { columnId } = action.payload;
        // const targetColumn = state.currentBoard.columns.find(
        //   column => column._id === columnId
        // );

        // if (targetColumn) {
        //   targetColumn.tasks.push(action.payload);
        // }
        const { columnId, ...newTask } = action.payload;
        console.log(columnId);
        state.currentBoard.columns = state.currentBoard.columns.map(column =>
          column._id === columnId
            ? { ...column, tasks: [...column.tasks, newTask] }
            : column
        );
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex(
          task => task._id === updatedTask._id
        );
        state.tasks[index] = updatedTask;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          task => task._id === action.payload
        );
        state.tasks.splice(index, 1);
      })
      .addMatcher(
        isAnyOf(
          getCurrentBoard.pending,
          addColumn.pending,
          deleteColumn.pending,
          editColumn.pending
        ),
        state => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getCurrentBoard.rejected,
          addColumn.rejected,
          deleteColumn.rejected,
          editColumn.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearCurrentBoard } = currentBoardSlice.actions;
export const getCurrentBoardReducer = currentBoardSlice.reducer;
