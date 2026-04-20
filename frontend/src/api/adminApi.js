import axiosClient from './axiosClient.js';
import { API_ENDPOINTS } from '../constants/apiEndpoints.js';

export const adminApi = {
  bookings: () => axiosClient.get(API_ENDPOINTS.ADMIN.BOOKINGS),
};
