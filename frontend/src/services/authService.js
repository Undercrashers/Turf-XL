import { authApi } from '../api/authApi.js';

export const authService = {
  requestOtp: (email) => authApi.requestOtp(email),
  verifyOtp: (email, otp) => authApi.verifyOtp(email, otp),
  completeProfile: (payload) => authApi.completeProfile(payload),
  me: () => authApi.me(),
  logout: () => authApi.logout(),
};
