import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getCurrentBoard } from './operations';
import { addColumn, deleteColumn, editColumn } from '../columns/operations';
import { createTask, deleteTask, moveTask, updateTask } from '../tasks/operations';

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
        state.currentBoard.columns = state.currentBoard.columns.map(
          item =>
            (item =
              item._id === action.payload._id
                ? { ...item, title: action.payload.title }
                : item)
        );
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.currentBoard.columns = state.currentBoard.columns.filter(
          item => item._id !== action.payload
        );
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const { columnId, ...newTask } = action.payload;

        state.currentBoard.columns = state.currentBoard.columns.map(column => {
          if (column._id === columnId) {
            const updatedTasks = Array.isArray(column.tasks)
              ? [...column.tasks, newTask]
              : [newTask];
            return { ...column, tasks: updatedTasks };
          }
          return column;
        });
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const { columnId, _id: taskId } = updatedTask;

        const targetColumn = state.currentBoard.columns.find(
          column => column._id === columnId
        );

        if (targetColumn) {
          const taskIndex = targetColumn.tasks.findIndex(
            task => task._id === taskId
          );

          if (taskIndex !== -1) {
            targetColumn.tasks[taskIndex] = updatedTask;
          }
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { columnId, taskId } = action.payload;
        const targetColumn = state.currentBoard.columns.find(
          column => column._id === columnId
        );

        if (targetColumn) {
          const taskIndex = targetColumn.tasks.findIndex(
            task => task._id === taskId
          );

          if (taskIndex !== -1) {
            targetColumn.tasks.splice(taskIndex, 1);
          }
        }
      })
      .addCase(moveTask.fulfilled, (state, action) => {
        const { taskId, newColumnId, ...movedTask} = action.payload
        const oldColumn = state.currentBoard.columns.find(column => column.tasks.find(task => task._id === taskId))

        if (oldColumn) {
          const taskIndex = oldColumn.tasks.findIndex(task => task._id === taskId)

          oldColumn.tasks.splice(taskIndex, 1)

          const newColumn = state.currentBoard.columns.find(column => column._id === newColumnId)

          if (newColumn) {
            newColumn.tasks = Array.isArray(newColumn.tasks) ? [...newColumn.tasks, movedTask] : [movedTask];
          }
        }
      })
      .addMatcher(
        isAnyOf(
          getCurrentBoard.pending,
          addColumn.pending,
          deleteColumn.pending,
          editColumn.pending,
          createTask.pending,
          updateTask.pending,
          deleteTask.pending,
          moveTask.pending
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
          editColumn.rejected,
          createTask.rejected,
          updateTask.rejected,
          deleteTask.rejected,
          moveTask.rejected
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
