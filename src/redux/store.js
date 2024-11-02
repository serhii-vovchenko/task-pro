import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice.js';

export const store = configureStore({
  reducer: {
    // Some code
    authReducer,
  },
});
