import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://task-pro-backend-mcfs.onrender.com/',
});
