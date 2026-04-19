import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { bookingApi } from '../api/bookingApi.js';

const DATE_FMT = { day: '2-digit', month: 'short', year: 'numeric' };
const TIME_FMT = { hour: '2-digit', minute: '2-digit', hour12: false };

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', DATE_FMT);
}

function formatTime(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('en-IN', TIME_FMT);
}

export default function UserDashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Player';

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await bookingApi.myBookings();
        if (!cancelled) setBookings(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setBookings([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const upcoming = useMemo(() => {
    const now = new Date();
    return bookings
      .filter((b) => b.status !== 'CANCELLED' && b.startTime && new Date(b.startTime) >= now)
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  }, [bookings]);

  const nextMatch = upcoming[0];
  const recent = bookings.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface tracking-tight">
            Welcome back, {firstName}
          </h2>
          <p className="font-body text-secondary mt-2 text-lg">
            {nextMatch ? 'Your next match is coming up soon.' : 'No bookings yet — pick a pitch to get started.'}
          </p>
        </div>
        <Link
          to="/"
          className="hidden md:flex px-6 py-3 bg-gradient-primary text-on-primary rounded-xl font-headline font-bold items-center gap-2 hover:shadow-lg transition-shadow"
        >
          <span className="material-symbols-outlined">add</span>
          Quick Book
        </Link>
      </section>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upcoming match */}
        <div className="md:col-span-2 bg-surface-container-lowest rounded-[1.5rem] p-8 relative overflow-hidden group min-h-[280px] shadow-ambient border border-outline-variant/15">
          {nextMatch?.turfImageUrl && (
            <>
              <div className="absolute inset-0 z-0 opacity-20">
                <img alt="" className="w-full h-full object-cover" src={nextMatch.turfImageUrl} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent z-0" />
            </>
          )}
          <div className="relative z-10 flex flex-col h-full justify-between gap-12">
            <div className="flex justify-between items-start">
              <span className="font-label text-xs font-bold bg-primary text-on-primary px-3 py-1 rounded-full uppercase tracking-widest">
                {nextMatch ? 'Upcoming Match' : 'No Upcoming Match'}
              </span>
              {nextMatch && (
                <span className="font-body text-secondary font-medium">
                  {formatDate(nextMatch.startTime)} • {formatTime(nextMatch.startTime)}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-headline text-2xl font-bold mb-2 text-on-surface">
                {nextMatch ? nextMatch.turfName : 'Find your next pitch'}
              </h3>
              <div className="flex items-center gap-4 text-secondary mb-6">
                {nextMatch?.turfAddress && (
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span className="font-body text-sm">{nextMatch.turfAddress}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                {nextMatch ? (
                  <Link
                    to="/my-bookings"
                    className="px-6 py-2 bg-secondary-container text-on-secondary-container rounded-xl font-headline font-semibold text-sm hover:bg-surface-variant transition-colors"
                  >
                    View Details
                  </Link>
                ) : (
                  <Link
                    to="/"
                    className="px-6 py-2 bg-gradient-primary text-on-primary rounded-xl font-headline font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    Browse Venues
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Weather card */}
        <div className="bg-surface-container-low rounded-[1.5rem] p-6 flex flex-col justify-between shadow-ambient border border-outline-variant/15">
          <div>
            <h3 className="font-headline font-semibold text-lg mb-4 text-on-surface">
              Playing Conditions
            </h3>
            <div className="flex items-center justify-center py-6">
              <span className="material-symbols-outlined text-6xl text-tertiary-fixed-dim fill">
                clear_day
              </span>
            </div>
          </div>
          <div className="text-center">
            <p className="font-headline text-3xl font-bold text-on-surface tracking-tight">22°C</p>
            <p className="font-body text-secondary">Clear Evening</p>
            <p className="font-body text-sm text-secondary mt-2">Perfect weather for a match.</p>
          </div>
        </div>

        {/* Recent bookings */}
        <div className="md:col-span-3 bg-surface-container-lowest rounded-[1.5rem] p-8 shadow-ambient border border-outline-variant/15">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline font-semibold text-xl text-on-surface">Recent Bookings</h3>
            <Link
              to="/my-bookings"
              className="text-primary font-headline font-semibold text-sm hover:underline underline-offset-4"
            >
              View All
            </Link>
          </div>

          {loading ? (
            <p className="text-center text-on-surface-variant py-6">Loading…</p>
          ) : recent.length === 0 ? (
            <p className="text-center text-on-surface-variant py-6">
              No bookings yet. Head to the home page to book your first slot.
            </p>
          ) : (
            <div className="space-y-4">
              {recent.map((b) => {
                const cancelled = b.status === 'CANCELLED';
                return (
                  <div
                    key={b.id}
                    className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl hover:bg-surface-variant transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                        <span className="material-symbols-outlined">sports_soccer</span>
                      </div>
                      <div>
                        <p className="font-headline font-semibold text-on-surface">{b.turfName}</p>
                        <p className="font-body text-sm text-secondary">
                          {formatDate(b.startTime)} • {formatTime(b.startTime)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="font-headline font-bold text-on-surface">
                        ₹{Number(b.totalAmount ?? 0).toLocaleString('en-IN')}
                      </p>
                      <span
                        className={`font-label text-[10px] font-bold tracking-widest ${
                          cancelled ? 'text-error' : 'text-primary'
                        }`}
                      >
                        {cancelled ? 'CANCELLED' : 'CONFIRMED'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
