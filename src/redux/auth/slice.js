import { createSlice } from '@reduxjs/toolkit';
import {
  loginThunk,
  logoutThunk,
  registerThunk,
  updateThemeInDatabase,
} from './operations.js';

const initialState = {
  user: {
    name: '',
    email: '',
  },
  token: '',
  isLoggedIn: false,
  isLoading: true,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: state => {
      state.user = {
        name: '',
        email: '',
      };
      state.token = '';
      state.isLoggedIn = false;
    },
    changeTheme: (state, action) => {
      state.user.theme = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(logoutThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.user = {
          name: null,
          email: null,
        };
        state.isLoggedIn = null;
        state.token = null;
        state.isLoading = false;
      })
      .addCase(updateThemeInDatabase.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const { resetAuthState, changeTheme } = slice.actions;
export const authReducer = slice.reducer;
