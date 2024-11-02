export const ADD_BOARD = 'ADD_BOARD';

export const addBoard = (boardName) => ({
  type: ADD_BOARD,
  payload: { id: Date.now(), name: boardName },
});


export const createBoard = (boardData) => {
  return {
    type: 'CREATE_BOARD', 
    payload: boardData, 
  };
};
