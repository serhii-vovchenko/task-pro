export const currentBoard = state => state.currentBoard.currentBoard;
export const selectCurrentBoard = state => state.currentBoard;
export const selectBoardColumns = state =>
  state.currentBoard.currentBoard?.columns || [];
export const selectorBoardId = state => state.currentBoard.currentBoard._id;
