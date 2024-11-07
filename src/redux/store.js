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
import { columnsReducer } from './dashboard/columns/slice.js';

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['token', 'user', 'isLoggedIn'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    columns: columnsReducer,
    needHelp: needHelpReducer,
    boards: boardsReducer,
    modals: modalsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
