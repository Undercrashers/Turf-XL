import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { ROLES } from '../constants/roles.js';

import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import VerifyOtpPage from '../pages/VerifyOtpPage.jsx';
import CompleteProfilePage from '../pages/CompleteProfilePage.jsx';
import UserDashboardPage from '../pages/UserDashboardPage.jsx';
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

      {/* Protected — dashboard-style pages */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/turfs/:turfId/book" element={<SlotBookingPage />} />
        </Route>
      </Route>

      {/* Admin */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
