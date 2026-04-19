import axios from 'axios';
import { STORAGE_KEYS } from '../constants/storageKeys.js';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    const body = response.data;
    if (body && typeof body === 'object' && 'success' in body && 'data' in body) {
      return body.data;
    }
    return body;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
