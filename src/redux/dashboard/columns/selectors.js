export const selectColumns = state => state.columns.items;
export const selectLoading = state => state.columns.isLoading;
export const selectError = state => state.columns.isError;
export const selectColumn = state => {
  const selectedColumnId = state.columns.selectedColumnId;
  return state.columns.items.find(column => column.id === selectedColumnId);
};
