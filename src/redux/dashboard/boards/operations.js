import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../config/api';
import { clearCurrentBoard } from '../currentBoard/slice';

export const getBoardThunk = createAsyncThunk('boards', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const accessToken = state.auth.token;
    const { data } = await api.get('boards', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getBoardById = createAsyncThunk(
  '/boards/getById',
  async (boardId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const accessToken = state.auth.token;
      const { data } = await api.get(`/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('Board not found');
        thunkAPI.dispatch(clearCurrentBoard());
        return {}; // Return an empty object or null
      }
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async (data, thunkAPI) => {
    const state = thunkAPI.getState();
    const accessToken = state.auth.token;

    if (!accessToken) {
      return thunkAPI.rejectWithValue('Token not found');
    }

    try {
      const response = await api.post('boards', data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async (updatedBoardObject, thunkAPI) => {
    const state = thunkAPI.getState();
    const accessToken = state.auth.token;

    if (!accessToken) {
      return thunkAPI.rejectWithValue('Token not found');
    }

    try {
      const { _id, ...data } = updatedBoardObject;

      const response = await api.patch(`/boards/${_id}`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (boardId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const accessToken = state.auth.token;

      console.log('Deleting board with ID:', boardId);
      const response = await api.delete(`/boards/${boardId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // console.log('API response:', response);

      // Ensure you are returning the correct data (e.g., boardId)
      return boardId;
    } catch (error) {
      console.error('Error deleting board:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
