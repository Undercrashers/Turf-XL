# Feature: auth

Email-OTP authentication logic scoped to its own feature folder.

Suggested internal layout:
```
features/auth/
  components/     // OtpInput, EmailForm, etc.
  hooks/          // useOtpCountdown
  authSlice.js    // if migrating to Redux / Zustand later
```
