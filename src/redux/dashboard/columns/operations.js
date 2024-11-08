import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../config/api.js';

export const addColumn = createAsyncThunk(
  'columns/create',
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post('columns', body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const addColumn = createAsyncThunk('columns', async (body, thunkAPI) => {
//   const state = thunkAPI.getState();
//   const token = state.auth.token;
//   if (!token) {
//     return thunkAPI.rejectWithValue('Token not found');
//   }
//   try {
//     setToken(token);
//     const { data } = await api.post('columns', body);
//     console.log(data);
//     return data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

export const editColumn = createAsyncThunk(
  'columns/edit',
  async ({ id, body }, thunkAPI) => {
    try {
      const { data } = await api.patch(`columns/${id}`, body);
      return data;
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
