import { createSlice } from '@reduxjs/toolkit';
import { submitNeedHelpThunk } from './operations';

const needHelpSlice = createSlice({
  name: 'needHelp',
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitNeedHelpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitNeedHelpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(submitNeedHelpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const needHelpReducer = needHelpSlice.reducer;