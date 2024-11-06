import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../config/api.js';

export const submitNeedHelpThunk = createAsyncThunk(
  'help/submit',
  async (formData, thunkAPI) => {
    try {
      const response = await api.post('/help', formData);
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);
