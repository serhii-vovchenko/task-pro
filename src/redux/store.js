import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice.js';
import boardReducer from './reducers/boardReducer';
import themeReducer from './reducers/themeReducer';
import userReducer from './reducers/userReducer';
import { needHelpReducer } from './dashboard/need-help-form/slice.js';
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
import { columnsReducer } from './dashboard/columns/slise.js';

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['token', 'user', 'isLoggedIn'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    board: boardReducer,
    theme: themeReducer,
    user: userReducer,
    columns: columnsReducer,
    needHelp: needHelpReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
