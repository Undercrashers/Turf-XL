import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookingApi } from '../api/bookingApi.js';
import { getTurfById } from '../features/turf/mockTurfs.js';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const DATE_GRID = [
  { day: 14 },
  { day: 15 },
  { day: 16, today: true },
  { day: 17 },
  { day: 18 },
  { day: 19 },
  { day: 20 },
];

const SLOTS = [
  { time: '5:00 PM', duration: '60 mins', price: 900, status: 'booked' },
  { time: '6:00 PM', duration: '60 mins', price: 1200, status: 'available' },
  { time: '7:00 PM', duration: '60 mins', price: 1200, status: 'available' },
  { time: '8:00 PM', duration: '60 mins', price: 1100, status: 'available' },
  { time: '9:00 PM', duration: '60 mins', price: 1000, status: 'booked' },
];

export default function SlotBookingPage() {
  const { turfId } = useParams();
  const navigate = useNavigate();
  const turf = getTurfById(turfId);

  const [selectedDay, setSelectedDay] = useState(16);
  const [selectedSlot, setSelectedSlot] = useState('7:00 PM');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    setError('');
    const slot = SLOTS.find((s) => s.time === selectedSlot);
    if (!slot || slot.status !== 'available') {
      setError('Please pick an available slot');
      return;
    }
    try {
      setSubmitting(true);
      await bookingApi.create({
        turfId: Number(turfId),
        slotLabel: slot.time,
        bookingDate: new Date().toISOString().slice(0, 10),
        amount: slot.price,
      });
      navigate('/my-bookings');
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save booking. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-8 pb-28 px-6 max-w-5xl mx-auto w-full">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-on-surface mb-2">Select Your Slot</h1>
        <p className="text-on-surface-variant text-lg">
          {turf ? `${turf.name} — ${turf.location}` : 'Turf XL Baisakhi - Main Pitch'}
        </p>
      </div>

      {/* Date picker */}
      <div className="bg-surface-container-low rounded-[2rem] p-8 mb-12 shadow-ambient">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-on-surface">October 2024</h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {DAYS.map((d) => (
            <div
              key={d}
              className="text-center text-sm font-medium text-on-surface-variant mb-2"
            >
              {d}
            </div>
          ))}
          {DATE_GRID.map((d) => {
            const isActive = d.day === selectedDay;
            return (
              <button
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-transform ${
                  isActive
                    ? 'bg-gradient-primary text-on-primary shadow-md scale-105'
                    : 'bg-surface-container-highest text-on-surface hover:bg-surface-variant'
                }`}
              >
                <span className={`text-lg ${isActive ? 'font-bold' : 'font-semibold'}`}>
                  {d.day}
                </span>
                {d.today && (
                  <span className="text-xs opacity-80 mt-1">{isActive ? 'Today' : ''}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      <h3 className="text-xl font-semibold text-on-surface mb-6">Available Times</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {SLOTS.map((s) => {
          if (s.status === 'booked') {
            return (
              <div
                key={s.time}
                className="bg-surface-container-high rounded-xl p-6 opacity-60 cursor-not-allowed"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-on-surface font-medium text-lg">{s.time}</p>
                    <p className="text-on-surface-variant text-sm">{s.duration}</p>
                  </div>
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider bg-surface-container-highest px-2 py-1 rounded">
                    Booked
                  </span>
                </div>
                <div className="text-on-surface-variant font-medium">
                  ₹{s.price.toLocaleString('en-IN')}
                </div>
              </div>
            );
          }

          const selected = selectedSlot === s.time;
          if (selected) {
            return (
              <div
                key={s.time}
                onClick={() => setSelectedSlot(s.time)}
                className="bg-gradient-primary rounded-xl p-6 shadow-ambient text-left relative overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/5" />
                <div className="relative z-10 flex justify-between items-start mb-4">
                  <div>
                    <p className="text-on-primary font-bold text-lg">{s.time}</p>
                    <p className="text-on-primary/80 text-sm">{s.duration}</p>
                  </div>
                  <span className="material-symbols-outlined text-on-primary fill">
                    check_circle
                  </span>
                </div>
                <div className="relative z-10 text-on-primary font-bold text-lg">
                  ₹{s.price.toLocaleString('en-IN')}
                </div>
              </div>
            );
          }

          return (
            <button
              key={s.time}
              onClick={() => setSelectedSlot(s.time)}
              className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient border border-outline-variant/15 hover:border-primary/40 text-left transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-on-surface font-medium text-lg group-hover:text-primary transition-colors">
                    {s.time}
                  </p>
                  <p className="text-on-surface-variant text-sm">{s.duration}</p>
                </div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary-container/10 px-2 py-1 rounded">
                  Available
                </span>
              </div>
              <div className="text-on-surface font-medium text-lg">
                ₹{s.price.toLocaleString('en-IN')}
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-sm text-error text-center mb-4">{error}</p>
      )}

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-md border-t border-outline-variant/15 p-4 z-40 md:relative md:bg-transparent md:border-none md:p-0 md:flex md:justify-end">
        <button
          onClick={handleConfirm}
          disabled={submitting}
          className="w-full md:w-auto bg-gradient-primary text-on-primary font-bold text-lg py-4 px-12 rounded-full shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:scale-100"
        >
          {submitting ? 'Saving...' : 'Confirm Booking'}
          {!submitting && <span className="material-symbols-outlined">check_circle</span>}
        </button>
      </div>
    </main>
  );
}
