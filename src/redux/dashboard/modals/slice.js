import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false,
  isCreateBoardOpen: false,
  isUpdateBoardOpen: false,
};

const modalsSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleCreateBoard(state) {
      state.isCreateBoardOpen = !state.isCreateBoardOpen;
    },
    toggleUpdateBoar(state) {
      state.isUpdateBoardOpen = !state.isUpdateBoardOpen;
    },
  },
});

export const { toggleSidebar, toggleCreateBoard, toggleUpdateBoar } =
  modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;
