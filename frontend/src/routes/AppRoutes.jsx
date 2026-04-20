import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { ROLES } from '../constants/roles.js';

import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import VerifyOtpPage from '../pages/VerifyOtpPage.jsx';
import CompleteProfilePage from '../pages/CompleteProfilePage.jsx';
import UserDashboardPage from '../pages/UserDashboardPage.jsx';
import AdminLoginPage from '../pages/AdminLoginPage.jsx';
import AdminDashboardPage from '../pages/AdminDashboardPage.jsx';
import TurfDetailsPage from '../pages/TurfDetailsPage.jsx';
import SlotBookingPage from '../pages/SlotBookingPage.jsx';
import MyBookingsPage from '../pages/MyBookingsPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/turfs/:turfId" element={<TurfDetailsPage />} />
      </Route>

      {/* Auth flow (email OTP only) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/complete-profile" element={<CompleteProfilePage />} />
      </Route>

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/turfs/:turfId/book" element={<SlotBookingPage />} />
        </Route>
      </Route>

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        element={
          <ProtectedRoute
            allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}
            loginPath="/admin/login"
          />
        }
      >
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
