import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../config/api';
import { clearCurrentBoard, updateCurrentBoard } from '../currentBoard/slice';
import { getCurrentBoard } from '../currentBoard/operations';

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
        return {};
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

      thunkAPI.dispatch(getCurrentBoard(response.data.data._id));

      return response.data.data;
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

      thunkAPI.dispatch(updateCurrentBoard(response.data.data));

      return response.data.data;
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
      await api.delete(`/boards/${boardId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      thunkAPI.dispatch(clearCurrentBoard());

      return boardId;
    } catch (error) {
      console.error('Error deleting board:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
