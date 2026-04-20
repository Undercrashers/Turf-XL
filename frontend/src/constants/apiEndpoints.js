export const API_ENDPOINTS = {
  AUTH: {
    REQUEST_OTP: '/auth/request-otp',
    VERIFY_OTP: '/auth/verify-otp',
    COMPLETE_PROFILE: '/auth/complete-profile',
    ADMIN_LOGIN: '/auth/admin-login',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
  },
  USER: {
    ME: '/users/me',
  },
  TURF: {
    LIST: '/turfs',
    BY_ID: (id) => `/turfs/${id}`,
  },
  SLOT: {
    BY_TURF: (turfId) => `/turfs/${turfId}/slots`,
  },
  BOOKING: {
    CREATE: '/bookings',
    MINE: '/bookings/me',
    CANCEL: (id) => `/bookings/${id}/cancel`,
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    BOOKINGS: '/admin/bookings',
  },
};
