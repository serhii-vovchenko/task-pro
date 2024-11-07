import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://task-pro-backend-mcfs.onrender.com/',
});

export const setToken = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  api.defaults.headers.common.Authorization = ``;
};
