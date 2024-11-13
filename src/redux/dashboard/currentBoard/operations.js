import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../config/api';
import { clearCurrentBoard } from './slice';

export const getCurrentBoard = createAsyncThunk(
  '/currentBoards',
  async (boardId, thunkAPI) => {
    const state = thunkAPI.getState();
    const boards = state.boards.boards;

    if (!boardId) {
      thunkAPI.dispatch(clearCurrentBoard());
      return;
    }

    const boardExists = boards.some(board => board._id === boardId);
    if (!boardExists) {
      thunkAPI.dispatch(clearCurrentBoard());
      return;
    }

    try {
      const accessToken = state.auth.token;
      const { data } = await api.get(`/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      localStorage.setItem('currentId', JSON.stringify(data.data._id));
      return data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
