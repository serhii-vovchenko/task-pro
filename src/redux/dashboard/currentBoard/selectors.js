import { createSelector } from '@reduxjs/toolkit';

export const currentBoard = state => state.currentBoard.currentBoard;

export const selectCurrentBoard = state => state.currentBoard;

export const selectSelectedPriority = state =>
  state.currentBoard.selectedPriority;

export const selectBoardColumns = createSelector(
  [currentBoard, selectSelectedPriority],
  (currentBoard, selectedPriority) => {
    if (!currentBoard) return [];

    return currentBoard.columns.map(column => {
      const filteredTasks =
        column.tasks?.filter(task => {
          if (selectedPriority === 'all') return true;
          return task.priority === selectedPriority;
        }) || [];
      return { ...column, tasks: filteredTasks };
    });
  }
);

export const selectorBoardId = state => state.currentBoard.currentBoard?._id;

export const selectTasksByColumnId = columnId =>
  createSelector([selectBoardColumns], columns => {
    const column = columns.find(col => col._id === columnId);
    return column ? column.tasks : [];
  });
