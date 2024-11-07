import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://task-pro-backend-mcfs.onrender.com/',
});

export const setAuthHeader = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = '';
};