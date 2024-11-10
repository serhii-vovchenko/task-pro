import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice.js';
import { needHelpReducer } from './dashboard/need-help-form/slice.js';
import { modalsReducer } from './dashboard/modals/slice.js';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { boardsReducer } from './dashboard/boards/slice.js';
import { getCurrentBoardReducer } from './dashboard/currentBoard/slice.js';
// import { tasksReducer } from './dashboard/tasks/slice.js';

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['token', 'user', 'isLoggedIn', 'showLoginDelay'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    needHelp: needHelpReducer,
    boards: boardsReducer,
    modals: modalsReducer,
    currentBoard: getCurrentBoardReducer,
    // tasks: tasksReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
