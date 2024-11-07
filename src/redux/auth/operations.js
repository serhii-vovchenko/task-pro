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
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.patch('/api/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
