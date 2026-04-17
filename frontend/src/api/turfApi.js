import axiosClient from './axiosClient.js';
import { API_ENDPOINTS } from '../constants/apiEndpoints.js';

export const turfApi = {
  list: () => axiosClient.get(API_ENDPOINTS.TURF.LIST),
  getById: (id) => axiosClient.get(API_ENDPOINTS.TURF.BY_ID(id)),
};
