import axiosClient from './axiosClient.js';
import { API_ENDPOINTS } from '../constants/apiEndpoints.js';

export const bookingApi = {
  create: (payload) => axiosClient.post(API_ENDPOINTS.BOOKING.CREATE, payload),
  myBookings: () => axiosClient.get(API_ENDPOINTS.BOOKING.MINE),
  cancel: (id) => axiosClient.post(API_ENDPOINTS.BOOKING.CANCEL(id)),
};
