import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, setToken } from '../../../config/api';

export const deleteTask = createAsyncThunk(
  'task/delete',
  async ({ taskId, columnId }, thunkAPI) => {
    const state = thunkAPI.getState();
    const accessToken = state.auth.token;
    try {
      setToken(accessToken);
      await api.delete(`/tasks/${taskId}`);
      return { taskId, columnId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'task/update',
  async ({ taskId, values }, thunkAPI) => {
    const state = thunkAPI.getState();
    const accessToken = state.auth.token;

    try {
      setToken(accessToken);
      const { data } = await api.patch(`/tasks/${taskId}`, values);
      return data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createTask = createAsyncThunk(
  'task/create',
  async (values, thunkAPI) => {
    const state = thunkAPI.getState();
    const accessToken = state.auth.token;

    try {
      setToken(accessToken);
      const { data } = await api.post('/tasks', values);
      return data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
