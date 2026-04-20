import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getTurfById } from '../features/turf/mockTurfs.js';
import { bookingApi } from '../api/bookingApi.js';
import { slotApi } from '../api/slotApi.js';
import { useAuth } from '../hooks/useAuth.js';
import { toLocalIsoDate, todayLocalIso } from '../utils/dates.js';

const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const STANDARD_SLOTS = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

function buildDateOptions(count = 4) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: count }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return {
      iso: toLocalIsoDate(d),
      label: i === 0 ? 'Today' : DAY_SHORT[d.getDay()],
      day: String(d.getDate()),
    };
  });
}

function formatSlotRange(start24) {
  const [hStr, m] = start24.split(':');
  const h = parseInt(hStr, 10);
  const endH = (h + 1) % 24;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(h)}:${m} - ${pad(endH)}:${m}`;
}

function to12HourLabel(start24) {
  const [hStr, m] = start24.split(':');
  const h = parseInt(hStr, 10);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${m} ${period}`;
}

export default function TurfDetailsPage() {
  const { turfId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const turf = getTurfById(turfId);

  const dateOptions = useMemo(() => buildDateOptions(4), []);

  const [selectedDate, setSelectedDate] = useState(dateOptions[0].iso);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [sport, setSport] = useState('football');
  const [bookedStartTimes, setBookedStartTimes] = useState(() => new Set());
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const sportPricing = turf?.sportPricing ?? { football: turf?.price ?? 0 };
  const currentPrice = sportPricing[sport] ?? turf?.price ?? 0;

  const isSlotPastForDate = useCallback(
    (startHHmm) => {
      if (selectedDate !== todayLocalIso()) return false;
      const now = new Date();
      const [h, m] = startHHmm.split(':').map((n) => parseInt(n, 10));
      const slotDate = new Date();
      slotDate.setHours(h, m, 0, 0);
      return slotDate <= now;
    },
    [selectedDate]
  );

  const isSlotUnavailable = useCallback(
    (startHHmm) => bookedStartTimes.has(startHHmm) || isSlotPastForDate(startHHmm),
    [bookedStartTimes, isSlotPastForDate]
  );

  const refreshSlots = useCallback(async () => {
    if (!turfId || !selectedDate) return;
    setLoadingSlots(true);
    try {
      const data = await slotApi.listByTurf(turfId, selectedDate);
      const booked = new Set(
        (Array.isArray(data) ? data : [])
          .filter((s) => s && s.available === false && s.startTime)
          .map((s) => String(s.startTime).slice(11, 16))
      );
      setBookedStartTimes(booked);
    } catch {
      setBookedStartTimes(new Set());
    } finally {
      setLoadingSlots(false);
    }
  }, [turfId, selectedDate]);

  useEffect(() => {
    refreshSlots();
  }, [refreshSlots]);

  // Auto-pick the first actually-available slot whenever date or availability changes.
  useEffect(() => {
    const firstFree = STANDARD_SLOTS.find((s) => !isSlotUnavailable(s));
    setSelectedSlot((prev) => {
      if (prev && !isSlotUnavailable(prev)) return prev;
      return firstFree ?? '';
    });
  }, [selectedDate, bookedStartTimes, isSlotUnavailable]);

  if (!turf) {
    return (
      <main className="pt-24 pb-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="font-headline text-3xl font-bold text-on-surface mb-4">Venue not found</h1>
          <p className="text-on-surface-variant mb-8">
            We couldn&apos;t find a venue with that id. Pick one from the featured list.
          </p>
          <Link
            to="/"
            className="inline-block bg-gradient-primary text-on-primary px-6 py-3 rounded-full font-headline font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const handleBook = async () => {
    setError('');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!selectedSlot) {
      setError('Please pick a time.');
      return;
    }
    if (bookedStartTimes.has(selectedSlot)) {
      setError('That slot is already booked. Please pick another.');
      return;
    }
    if (isSlotPastForDate(selectedSlot)) {
      setError('That slot time has already passed today. Pick a later time or another date.');
      return;
    }
    try {
      setSubmitting(true);
      await bookingApi.create({
        turfId: Number(turf.id),
        slotLabel: to12HourLabel(selectedSlot),
        bookingDate: selectedDate,
        amount: currentPrice,
        sport,
      });
      navigate('/my-bookings');
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save booking. Try again.');
      await refreshSlots();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mb-12 relative rounded-[2rem] overflow-hidden bg-surface-container-low h-[614px] min-h-[400px]">
          <img alt="" className="absolute inset-0 w-full h-full object-cover" src={turf.image} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          <div className="absolute bottom-8 left-8 right-8 md:right-auto md:w-[480px] p-8 rounded-3xl glass-panel text-on-surface">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-xs font-bold uppercase tracking-wider font-label">
                {turf.tagline}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-on-surface mb-2 tracking-tight">
              {turf.name}
            </h1>
            <p className="text-lg text-on-surface-variant mb-6 flex items-center">
              <span className="material-symbols-outlined mr-2">location_on</span>
              {turf.address}
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full text-sm font-medium">
                <span className="material-symbols-outlined text-[20px] text-primary">groups</span>
                {turf.format}
              </div>
              <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full text-sm font-medium">
                <span className="material-symbols-outlined text-[20px] text-primary">straighten</span>
                {turf.size}
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          {/* Left */}
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-surface-container-lowest p-8 rounded-3xl">
              <h2 className="text-2xl font-semibold font-headline mb-4 text-on-surface">
                About the Facility
              </h2>
              {turf.about.map((para, i) => (
                <p
                  key={i}
                  className={`text-base leading-relaxed text-secondary ${
                    i < turf.about.length - 1 ? 'mb-6' : ''
                  }`}
                >
                  {para}
                </p>
              ))}
            </section>

            <section>
              <h2 className="text-2xl font-semibold font-headline mb-6 text-on-surface">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {turf.amenities.map((a) => (
                  <div
                    key={a.label}
                    className="bg-surface-container-low p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-3xl text-primary">{a.icon}</span>
                    <span className="text-sm font-medium text-on-surface-variant">{a.label}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right booking panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-surface-container-lowest p-8 rounded-3xl shadow-ambient border border-outline-variant/15">
              <div className="flex justify-between items-baseline mb-6">
                <h3 className="text-3xl font-bold font-headline text-on-surface tracking-tight">
                  ₹{currentPrice.toLocaleString('en-IN')}
                  <span className="text-lg text-secondary font-medium font-body">/hour</span>
                </h3>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-on-surface-variant mb-3">Sport</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(sportPricing).map((s) => {
                    const active = sport === s;
                    const icon = s === 'cricket' ? 'sports_cricket' : 'sports_soccer';
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSport(s)}
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                          active
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">{icon}</span>
                        <span className="capitalize">{s}</span>
                        <span className={`text-xs ${active ? 'opacity-80' : 'text-on-surface-variant'}`}>
                          ₹{sportPricing[s].toLocaleString('en-IN')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-on-surface-variant mb-3">
                  Select Date
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar">
                  {dateOptions.map((d) => {
                    const active = d.iso === selectedDate;
                    return (
                      <button
                        key={d.iso}
                        type="button"
                        onClick={() => setSelectedDate(d.iso)}
                        className={`flex-shrink-0 w-16 p-3 rounded-2xl text-center transition-colors ${
                          active
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                        }`}
                      >
                        <div className={`text-xs mb-1 ${active ? 'opacity-80' : 'text-secondary'}`}>
                          {d.label}
                        </div>
                        <div className="text-xl font-bold font-headline">{d.day}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-on-surface-variant">
                    Available Times
                  </label>
                  {loadingSlots && (
                    <span className="text-xs text-on-surface-variant">Refreshing…</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {STANDARD_SLOTS.map((start) => {
                    const past = isSlotPastForDate(start);
                    const booked = bookedStartTimes.has(start);
                    const unavailable = past || booked;
                    const active = selectedSlot === start;
                    return (
                      <button
                        key={start}
                        type="button"
                        disabled={unavailable}
                        onClick={() => setSelectedSlot(start)}
                        title={past ? 'Time already passed' : booked ? 'Already booked' : ''}
                        className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors border ${
                          unavailable
                            ? 'bg-surface-container-high text-on-surface-variant opacity-50 cursor-not-allowed line-through border-transparent'
                            : active
                            ? 'bg-primary text-on-primary border-transparent'
                            : 'bg-surface-container-low hover:bg-surface-container text-on-surface border-transparent hover:border-outline-variant/30'
                        }`}
                      >
                        {formatSlotRange(start)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {error && <p className="text-sm text-error mb-3 text-center">{error}</p>}

              <button
                type="button"
                onClick={handleBook}
                disabled={submitting || !selectedSlot || isSlotUnavailable(selectedSlot)}
                className="block text-center w-full py-4 rounded-xl bg-gradient-primary text-on-primary font-bold text-lg tracking-wide shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Booking…' : isAuthenticated ? 'Book Now' : 'Login to Book'}
              </button>
              <p className="text-center text-xs text-secondary mt-4">
                Free cancellation up to 24 hours before.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
