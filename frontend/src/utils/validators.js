export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());

export const isValidPhone = (phone) =>
  /^\+?[0-9]{10,13}$/.test(String(phone || '').trim());

export const isValid10DigitPhone = (phone) =>
  /^[0-9]{10}$/.test(String(phone || '').trim());

export const isValidOtp = (otp) =>
  /^[0-9]{6}$/.test(String(otp || '').trim());
