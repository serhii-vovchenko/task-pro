import { createSelector } from '@reduxjs/toolkit';

export const currentBoard = state => state.currentBoard.currentBoard;
export const selectCurrentBoard = state => state.currentBoard;
export const selectBoardColumns = state =>
  state.currentBoard.currentBoard?.columns || [];
export const selectorBoardId = state => state.currentBoard.currentBoard._id;
export const selectTasksByColumnId = columnId =>
  createSelector([selectBoardColumns], columns => {
    const column = columns.find(col => col._id === columnId);
    return column ? column.tasks : [];
  });
