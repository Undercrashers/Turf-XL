import axiosClient from './axiosClient.js';
import { API_ENDPOINTS } from '../constants/apiEndpoints.js';

export const userApi = {
  getProfile: () => axiosClient.get(API_ENDPOINTS.USER.ME),
  updateProfile: (payload) => axiosClient.put(API_ENDPOINTS.USER.ME, payload),
};
