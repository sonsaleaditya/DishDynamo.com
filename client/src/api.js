// src/api.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add auth token headers here if needed
// instance.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export const api = {
  get: (endpoint, config = {}) => instance.get(endpoint, config),
  post: (endpoint, data, config = {}) => instance.post(endpoint, data, config),
  put: (endpoint, data, config = {}) => instance.put(endpoint, data, config),
  delete: (endpoint, config = {}) => instance.delete(endpoint, config),
};
