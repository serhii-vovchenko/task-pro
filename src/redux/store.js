import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice.js';
import boardReducer from './reducers/boardReducer';
import themeReducer from './reducers/themeReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReducer,
    theme: themeReducer,
    user: userReducer,
  },
});

// import { createStore, combineReducers } from 'redux';
// import boardReducer from './reducers/boardReducer';
// import themeReducer from './reducers/themeReducer';
// import userReducer from './reducers/userReducer';

// const rootReducer = combineReducers({
//   board: boardReducer,
//   theme: themeReducer,
//   user: userReducer,
// });

// export const store = createStore(rootReducer);
