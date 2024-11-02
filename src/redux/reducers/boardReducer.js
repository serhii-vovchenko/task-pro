import { ADD_BOARD } from '../actions/boardActions';

const initialState = {
  boards: [],
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.payload],
      };
    default:
      return state;
  }
};

export default boardReducer;


  