// import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice.js';

// export const store = configureStore({
//   reducer: {
//     // Some code
//   },
// });
import { createStore, combineReducers } from 'redux';
import boardReducer from './reducers/boardReducer';
import themeReducer from './reducers/themeReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  board: boardReducer,
  theme: themeReducer,
  user: userReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer);
