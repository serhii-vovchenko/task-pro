import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, setToken } from '../../../config/api.js';

export const addColumn = createAsyncThunk(
  'columns/create',
  async (body, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const accessToken = state.auth.token;
      setToken(accessToken);
      const { data } = await api.post('columns', body);

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editColumn = createAsyncThunk(
  'columns/edit',
  async ({ columnId, body }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const accessToken = state.auth.token;
      setToken(accessToken);
      const { data } = await api.patch(`columns/${columnId}`, body);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'columns/delete',
  async (id, thunkAPI) => {
    try {
      await api.delete(`columns/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
