import { CHANGE_THEME } from '../actions/themeActions';

const initialState = {
  currentTheme: 'dark',
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        currentTheme: action.payload,
      };
    default:
      return state;
  }
};

export default themeReducer;
