import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  currentUserThunk,
  googleLoginThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
  updateThemeInDatabase,
  updateUserProfile,
} from './operations.js';

const initialState = {
  user: {
    name: '',
    email: '',
  },
  token: '',
  isLoggedIn: false,
  isLoading: true,
  showLoginDelay: true,
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
      state.showLoginDelay = true;
    },
    changeTheme: (state, action) => {
      state.user.theme = action.payload;
    },
    changeLoginDelayState: (state, action) => {
      state.showLoginDelay = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(googleLoginThunk.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(currentUserThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.user = {
          name: null,
          email: null,
        };
        state.isLoggedIn = null;
        state.token = null;
        state.isLoading = false;
        state.showLoginDelay = true;
      })
      .addCase(updateThemeInDatabase.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user.photoUrl = action.payload.data.user.photoUrl;
      })

      .addMatcher(
        isAnyOf(
          registerThunk.pending,
          loginThunk.pending,
          currentUserThunk.pending,
          logoutThunk.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          registerThunk.rejected,
          loginThunk.rejected,
          currentUserThunk.rejected,
          logoutThunk.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.isLoggedIn = false;
          state.error = action.payload;
        }
      );
  },
});

export const { resetAuthState, changeTheme } = slice.actions;
export const authReducer = slice.reducer;
