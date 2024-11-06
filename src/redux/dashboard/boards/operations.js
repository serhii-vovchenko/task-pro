import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../config/api';

export const getBoardThunk = createAsyncThunk('board', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const accessToken = state.auth.token;

    const { data } = await api.get('boards', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});
