import { useEffect, useState } from 'react';
import { bookingApi } from '../api/bookingApi.js';

const TABS = [
  { id: 'all', label: 'ALL' },
  { id: 'upcoming', label: 'UPCOMING' },
  { id: 'past', label: 'PAST' },
];

const DATE_FMT = { day: '2-digit', month: 'short', year: 'numeric' };
const TIME_FMT = { hour: '2-digit', minute: '2-digit', hour12: false };

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', DATE_FMT);
}

function formatTimeRange(startIso, endIso) {
  if (!startIso) return '';
  const start = new Date(startIso).toLocaleTimeString('en-IN', TIME_FMT);
  const end = endIso ? new Date(endIso).toLocaleTimeString('en-IN', TIME_FMT) : '';
  return end ? `${start} - ${end}` : start;
}

function bucketFor(booking) {
  if (booking.status === 'CANCELLED') return 'past';
  if (!booking.startTime) return 'upcoming';
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  return new Date(booking.startTime) >= startOfToday ? 'upcoming' : 'past';
}

export default function MyBookingsPage() {
  const [tab, setTab] = useState('upcoming');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await bookingApi.myBookings();
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

  const handleCancel = async (id) => {
    try {
      const updated = await bookingApi.cancel(id);
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not cancel booking');
    }
  };

  const visible = bookings.filter((b) => (tab === 'all' ? true : bucketFor(b) === tab));

  return (
    <div className="max-w-7xl mx-auto w-full p-6 md:p-12">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tight mb-2">
            My Bookings
          </h1>
          <p className="text-secondary text-lg font-body max-w-2xl leading-relaxed">
            Manage your upcoming matches and review your history on the pitch.
          </p>
        </div>
        <div className="flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`font-label font-bold text-sm px-5 py-2.5 rounded-full transition-colors ${
                tab === t.id
                  ? 'bg-tertiary text-on-tertiary shadow-sm'
                  : 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <section className="space-y-6">
        {loading && (
          <div className="bg-surface-container-lowest rounded-xl p-12 text-center text-on-surface-variant">
            Loading your bookings…
          </div>
        )}

        {error && !loading && (
          <div className="bg-error-container/40 rounded-xl p-6 text-center text-error">{error}</div>
        )}

        {!loading && !error && visible.length === 0 && (
          <div className="bg-surface-container-lowest rounded-xl p-12 text-center text-on-surface-variant">
            No bookings in this category yet.
          </div>
        )}

        {!loading &&
          visible.map((b) => {
            const cancelled = b.status === 'CANCELLED';
            return (
              <div
                key={b.id}
                className={`bg-surface-container-lowest rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden group ${
                  cancelled ? 'opacity-75' : ''
                }`}
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-2 ${
                    cancelled ? 'bg-error' : 'bg-primary'
                  }`}
                />
                <div className="w-full md:w-64 h-48 md:h-auto rounded-lg overflow-hidden shrink-0 relative bg-surface-container-low">
                  {b.turfImageUrl && (
                    <img
                      alt=""
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                      src={b.turfImageUrl}
                    />
                  )}
                  <div
                    className={`absolute top-3 left-3 font-label font-bold text-xs px-3 py-1 rounded-full tracking-widest shadow-sm flex items-center gap-1 ${
                      cancelled ? 'bg-error text-on-error' : 'bg-primary text-on-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px] fill">
                      {cancelled ? 'cancel' : 'check_circle'}
                    </span>
                    {cancelled ? 'CANCELLED' : 'CONFIRMED'}
                  </div>
                </div>

                <div className="flex-1 w-full space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      {b.sport && (
                        <div className="inline-flex items-center gap-1 bg-primary-container/20 text-primary px-2 py-0.5 rounded-full font-label text-xs font-bold uppercase tracking-wider mb-2">
                          <span className="material-symbols-outlined text-[14px]">
                            {b.sport === 'cricket' ? 'sports_cricket' : 'sports_soccer'}
                          </span>
                          {b.sport}
                        </div>
                      )}
                      <h3 className="font-headline font-semibold text-2xl text-on-surface mb-1">
                        {b.turfName}
                      </h3>
                      <p className="font-body text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                        {b.turfAddress}
                      </p>
                    </div>
                    <div className="text-right shrink-0 hidden md:block">
                      <span
                        className={`text-2xl font-headline font-bold ${
                          cancelled ? 'text-secondary line-through' : 'text-on-surface'
                        }`}
                      >
                        ₹{Number(b.totalAmount ?? 0).toLocaleString('en-IN')}
                      </span>
                      <p
                        className={`text-xs font-label uppercase ${
                          cancelled ? 'text-error' : 'text-secondary'
                        }`}
                      >
                        {cancelled ? 'Refunded' : 'Paid'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-surface-variant/30">
                    <div>
                      <p className="text-xs font-label text-secondary mb-1">DATE</p>
                      <p className="font-body font-medium text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          event
                        </span>
                        {formatDate(b.startTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-label text-secondary mb-1">TIME</p>
                      <p className="font-body font-medium text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          schedule
                        </span>
                        {formatTimeRange(b.startTime, b.endTime)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-4 pt-2">
                    <button
                      className={`w-full md:w-auto font-headline font-bold py-3 px-8 rounded-xl transition-opacity ${
                        cancelled
                          ? 'bg-surface-container-high text-on-surface hover:bg-surface-variant'
                          : 'bg-gradient-primary text-on-primary hover:opacity-90'
                      }`}
                    >
                      View Details
                    </button>
                    {!cancelled && (
                      <button
                        onClick={() => handleCancel(b.id)}
                        className="w-full md:w-auto text-error font-body font-medium py-3 px-6 hover:bg-error-container/50 rounded-xl transition-colors"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
}
