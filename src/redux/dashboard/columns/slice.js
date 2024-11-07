import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addColumn, editColumn, deleteColumn } from './operations.js';

const initialState = {
  items: [],
  isLoading: false,
  isError: null,
  selectedColumnId: null,
};

const slice = createSlice({
  name: 'columns',
  initialState,

  reducers: {
    setSelectedColumnId: (state, action) => {
      state.selectedColumnId = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(addColumn.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(editColumn.fulfilled, (state, action) => {
        state.items = state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addMatcher(
        isAnyOf(addColumn.pending, deleteColumn.pending, editColumn.pending),
        state => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(addColumn.rejected, deleteColumn.rejected, editColumn.rejected),
        state => {
          state.isLoading = false;
          state.isError = true;
        }
      )
      .addMatcher(
        isAnyOf(
          addColumn.fulfilled,
          deleteColumn.fulfilled,
          editColumn.fulfilled
        ),
        state => {
          state.isLoading = false;
        }
      );
  },
});

export const { setSelectedColumnId } = slice.actions;
export const columnsReducer = slice.reducer;
