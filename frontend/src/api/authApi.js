import axiosClient from './axiosClient.js';
import { API_ENDPOINTS } from '../constants/apiEndpoints.js';

export const authApi = {
  requestOtp: (email) => axiosClient.post(API_ENDPOINTS.AUTH.REQUEST_OTP, { email }),
  verifyOtp: (email, otp) => axiosClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, { email, otp }),
  completeProfile: (payload) => axiosClient.post(API_ENDPOINTS.AUTH.COMPLETE_PROFILE, payload),
  adminLogin: (email, password) =>
    axiosClient.post(API_ENDPOINTS.AUTH.ADMIN_LOGIN, { email, password }),
  me: () => axiosClient.get(API_ENDPOINTS.AUTH.ME),
  logout: () => axiosClient.post(API_ENDPOINTS.AUTH.LOGOUT),
};
