import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api, clearToken, setToken } from '../../config/api.js';
import { resetAuthState } from './slice.js';

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (registerCredentials, thunkAPI) => {
    try {
      let { name, ...loginCredentials } = registerCredentials;
      await api.post('auth/register', registerCredentials);
      const { data } = await api.post('auth/login', loginCredentials);
      setToken(data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('auth/login', credentials);
      setToken(data.data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const currentUserThunk = createAsyncThunk(
  'users/current',
  async (_, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.token;
      if (!accessToken) {
        return thunkAPI.rejectWithValue('Access token is missing');
      }

      const { data } = await api.get('users/current', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setToken(data.data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (accessToken, thunkAPI) => {
    clearToken();
    try {
      const response = await api.post(
        'auth/logout',
        { accessToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 204 || response.status === 200) {
        thunkAPI.dispatch(resetAuthState());
        return { message: 'Logout successful' };
      } else {
        throw new Error(`Logout failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (formData, { rejectWithValue, getState }) => {
    try {
      const response = await api.patch('users/edit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateThemeInDatabase = createAsyncThunk(
  'auth/updateTheme',
  async (newTheme, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const response = await api.patch(
        `/users/theme`,
        { theme: newTheme },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      thunkAPI.dispatch(changeTheme(response.data.data.theme));

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
