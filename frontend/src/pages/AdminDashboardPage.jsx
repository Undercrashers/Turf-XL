import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../api/adminApi.js';
import { useAuth } from '../hooks/useAuth.js';
import { ROLES } from '../constants/roles.js';

const DATE_FMT = { day: '2-digit', month: 'short', year: 'numeric' };
const TIME_FMT = { hour: '2-digit', minute: '2-digit', hour12: false };

function formatDate(iso) {
  if (!iso) return '-';
  return new Date(iso).toLocaleDateString('en-IN', DATE_FMT);
}
function formatTime(iso) {
  if (!iso) return '-';
  return new Date(iso).toLocaleTimeString('en-IN', TIME_FMT);
}

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await adminApi.bookings();
        if (!cancelled) setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) setError(err?.response?.data?.message || 'Could not load bookings');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter((b) => b.status === 'CONFIRMED').length;
    const cancelled = bookings.filter((b) => b.status === 'CANCELLED').length;
    const revenue = bookings
      .filter((b) => b.status === 'CONFIRMED')
      .reduce((sum, b) => sum + Number(b.totalAmount ?? 0), 0);
    return { total, confirmed, cancelled, revenue };
  }, [bookings]);

  const visible = bookings.filter((b) =>
    statusFilter === 'ALL' ? true : b.status === statusFilter
  );

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleCancel = async (booking) => {
    if (booking.status === 'CANCELLED') return;
    const confirmed = window.confirm(
      `Cancel booking for ${booking.userName || booking.userEmail}?\n` +
        `The customer will be emailed and the slot will be freed.`
    );
    if (!confirmed) return;
    try {
      setCancellingId(booking.id);
      await adminApi.cancelBooking(booking.id);
      setBookings((prev) =>
        prev.map((b) => (b.id === booking.id ? { ...b, status: 'CANCELLED' } : b))
      );
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not cancel booking');
    } finally {
      setCancellingId(null);
    }
  };

  const isSuper = user?.role === ROLES.SUPER_ADMIN;

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-surface-container-lowest border-b border-outline-variant/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="font-headline text-2xl font-bold text-primary">Turf XL</h1>
            <span className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-widest bg-surface-container-high px-3 py-1 rounded-full">
              {isSuper ? 'Super Admin' : 'Field Admin'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="font-body text-sm font-medium text-on-surface">{user?.name}</p>
              <p className="font-body text-xs text-on-surface-variant">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="font-headline font-semibold text-sm px-4 py-2 bg-surface-container-high text-on-surface rounded-xl hover:bg-surface-variant transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight">
            {isSuper ? 'All Bookings' : 'Your Venue Bookings'}
          </h2>
          <p className="font-body text-on-surface-variant mt-1">
            {isSuper
              ? 'Platform-wide view across every turf.'
              : 'Bookings for the venue you manage.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Bookings" value={stats.total} />
          <StatCard label="Confirmed" value={stats.confirmed} tone="primary" />
          <StatCard label="Cancelled" value={stats.cancelled} tone="error" />
          <StatCard label="Revenue" value={`₹${stats.revenue.toLocaleString('en-IN')}`} tone="tertiary" />
        </div>

        <div className="bg-surface-container-lowest rounded-[1.5rem] p-6 md:p-8 shadow-ambient border border-outline-variant/15">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
            <h3 className="font-headline text-xl font-semibold text-on-surface">Bookings</h3>
            <div className="flex gap-2">
              {['ALL', 'CONFIRMED', 'CANCELLED'].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`font-label font-bold text-xs px-4 py-2 rounded-full transition-colors ${
                    statusFilter === s
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-variant'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <p className="text-center text-on-surface-variant py-12">Loading bookings…</p>
          )}
          {error && !loading && <p className="text-center text-error py-12">{error}</p>}
          {!loading && !error && visible.length === 0 && (
            <p className="text-center text-on-surface-variant py-12">No bookings to display.</p>
          )}

          {!loading && !error && visible.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-on-surface-variant border-b border-outline-variant/30">
                    <th className="font-label font-bold uppercase tracking-widest text-xs py-3 pr-4">
                      Customer
                    </th>
                    {isSuper && (
                      <th className="font-label font-bold uppercase tracking-widest text-xs py-3 pr-4">
                        Venue
                      </th>
                    )}
                    <th className="font-label font-bold uppercase tracking-widest text-xs py-3 pr-4">
                      Date
                    </th>
                    <th className="font-label font-bold uppercase tracking-widest text-xs py-3 pr-4">
                      Time
                    </th>
                    <th className="font-label font-bold uppercase tracking-widest text-xs py-3 pr-4">
                      Sport
                    </th>
                    <th className="font-label font-bold uppercase tracking-widest text-xs py-3 pr-4">
                      Amount
                    </th>
                    <th className="font-label font-bold uppercase tracking-widest text-xs py-3 pr-4">
                      Status
                    </th>
                    <th className="font-label font-bold uppercase tracking-widest text-xs py-3 pr-4 text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((b) => (
                    <tr
                      key={b.id}
                      className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors"
                    >
                      <td className="py-4 pr-4">
                        <div className="font-body font-medium text-on-surface">
                          {b.userName || 'Unknown'}
                        </div>
                        <div className="font-body text-xs text-on-surface-variant">
                          {b.userEmail}
                        </div>
                        {b.userPhone && (
                          <div className="font-body text-xs text-on-surface-variant">
                            {b.userPhone}
                          </div>
                        )}
                      </td>
                      {isSuper && (
                        <td className="py-4 pr-4">
                          <div className="font-body font-medium text-on-surface">
                            {b.turfName}
                          </div>
                          <div className="font-body text-xs text-on-surface-variant">
                            {b.turfAddress}
                          </div>
                        </td>
                      )}
                      <td className="py-4 pr-4 font-body text-on-surface">
                        {formatDate(b.startTime)}
                      </td>
                      <td className="py-4 pr-4 font-body text-on-surface">
                        {formatTime(b.startTime)} - {formatTime(b.endTime)}
                      </td>
                      <td className="py-4 pr-4 font-body text-on-surface capitalize">
                        {b.sport || '-'}
                      </td>
                      <td className="py-4 pr-4 font-headline font-bold text-on-surface">
                        ₹{Number(b.totalAmount ?? 0).toLocaleString('en-IN')}
                      </td>
                      <td className="py-4 pr-4">
                        <span
                          className={`font-label font-bold text-xs px-2 py-1 rounded-full uppercase tracking-wider ${
                            b.status === 'CONFIRMED'
                              ? 'bg-primary/10 text-primary'
                              : b.status === 'CANCELLED'
                              ? 'bg-error/10 text-error'
                              : 'bg-surface-container-high text-on-surface-variant'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-right">
                        {b.status === 'CONFIRMED' ? (
                          <button
                            onClick={() => handleCancel(b)}
                            disabled={cancellingId === b.id}
                            className="font-label font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider text-error border border-error/40 hover:bg-error/10 transition-colors disabled:opacity-50 disabled:cursor-wait"
                          >
                            {cancellingId === b.id ? 'Cancelling…' : 'Cancel'}
                          </button>
                        ) : (
                          <span className="text-xs text-on-surface-variant">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, tone }) {
  const toneClass =
    tone === 'primary'
      ? 'text-primary'
      : tone === 'error'
      ? 'text-error'
      : tone === 'tertiary'
      ? 'text-tertiary'
      : 'text-on-surface';
  return (
    <div className="bg-surface-container-lowest rounded-[1.5rem] p-5 shadow-ambient border border-outline-variant/15">
      <p className="font-label font-bold text-xs text-on-surface-variant uppercase tracking-widest mb-2">
        {label}
      </p>
      <p className={`font-headline font-bold text-3xl tracking-tight ${toneClass}`}>{value}</p>
    </div>
  );
}
