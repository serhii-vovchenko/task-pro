import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../config/api';

export const getCurrentBoard = createAsyncThunk(
  '/currentBoards',
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
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
