export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectUser = state => state.auth.user;
export const selectToken = state => state.auth.token;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectLoading = state => state.auth.isLoading;
export const selectError = state => state.auth.isError;
export const selectUserTheme = state => state.auth.user?.theme ?? 'dark';
