import axiosClient from './axiosClient.js';
import { API_ENDPOINTS } from '../constants/apiEndpoints.js';

export const slotApi = {
  listByTurf: (turfId, date) =>
    axiosClient.get(API_ENDPOINTS.SLOT.BY_TURF(turfId), { params: { date } }),
};
