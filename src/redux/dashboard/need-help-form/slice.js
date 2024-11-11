import { createSlice } from '@reduxjs/toolkit';
import { submitNeedHelpThunk } from './operations';

const needHelpSlice = createSlice({
  name: 'needHelp',
  initialState: {
    loading: false,

  },
  extraReducers: (builder) => {
    builder
      .addCase(submitNeedHelpThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitNeedHelpThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitNeedHelpThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const needHelpReducer = needHelpSlice.reducer;