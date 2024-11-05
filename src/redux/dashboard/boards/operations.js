import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../config/api';

export const getBoardThunk = createAsyncThunk('boards', async (_, thunkAPI) => {
  try {
    // const token = localStorage.getItem('persist:auth');

    // if (!token) {
    //   return thunkAPI.rejectWithValue('Token not found');
    // }

    // const parsedAuthState = JSON.parse(token);
    // const parsedToken = JSON.parse(parsedAuthState.token);

    // const headers = {
    //   // headers: { Authorization: `Bearer ${parsedToken}` },
    //   Authorization: `Bearer ${parsedToken}`,
    // };

    // console.log(headers);

    const { data } = await api.get('boards');
    console.log('data', data);

    return data;
  } catch (error) {
    console.log(error);

    return thunkAPI.rejectWithValue(error.message);
  }
});
