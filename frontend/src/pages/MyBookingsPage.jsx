import { useState } from 'react';

const ALL_BOOKINGS = [
  {
    id: 'b1',
    status: 'confirmed',
    venue: 'Apex Arena - Pitch A',
    address: '124 Stadium Way, North District',
    date: 'Oct 24, 2024',
    time: '18:00 - 20:00',
    amount: 120,
    tab: 'upcoming',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBTl1Q3Lfy-B6xzcGVnrLhVVTo5MKUkUNOJVCQIAN92tzOfH79eBFHEbNZ2UP7CrvVqNxw3_jiJPONF2of0p10EM03buXTdS0Zcn4phuWteEZnxntPBIuHED-8nlwR9jL5k61WxYixYKAG-H6V-B91svHSZ81EdlEBlfjoQdEnJQOFEwTdK2winGaMC7ylBq86kWLFHkYs68mF23-PNE9-bnNe4pu67EaOnjAuuxRw1qkd_xpit_2PZ5yBY8Py6VKvUEzd8NSJkyLMx',
  },
  {
    id: 'b2',
    status: 'confirmed',
    venue: 'Metro Sports Hub - Indoor 2',
    address: '88 Center Blvd, Downtown',
    date: 'Oct 28, 2024',
    time: '20:00 - 21:30',
    amount: 95,
    tab: 'upcoming',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUYLTW4M4uH4FGiDvnkfLlyOKtGG6XWFCoBU8XAYdJJ-BsxzKJevSet-4uxbCVVos2-pwyfj5UGn3dL6-s16qi7oORlqWZuxJTPS9Dr_tGjiNqYwIFA_wudBXAjTNKyNH3tHSga9sWp2I3nwn8r_wLKgjjVQN9j8xRsNf7QZhYPNjrBkV6fCGq735uOFNVxivKm7T_1L6KRtfsyfPvNunZ0ZAHSRCTwgcyLIn8yOyAeFM6kDPuC9j4HALIAGUTOO3jFBqk5qv2TRrD',
  },
  {
    id: 'b3',
    status: 'cancelled',
    venue: 'Eastside Pitch',
    address: '45 East Avenue',
    date: 'Oct 15, 2024',
    time: '17:00 - 18:00',
    amount: 80,
    tab: 'past',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCebXRlFvoi9jYtfRji_k1PGN4PwpLvHV7qmxe_9yhqDDEjPl9uo6HkbL8tkH2ISeHeQA5McDF_GDxqFVGIAY9N3EBPL8SJ_EUTSR6yh_BM6EF5cHnXp25erT4_lT1yavEV12MJHcUAdFXB_rEicPo05ZhGDh7QCARRLmTiN0tvbip2tFD2WXg1z9BfB6XJQksXOmLAiCG42xf_VzLjPrXi8-T5cMEY9AKTytTTsG3AvSGPDxXY6bbGFKB1O2Wzfg16PfIt3akoNwZm',
  },
];

const TABS = [
  { id: 'all', label: 'ALL' },
  { id: 'upcoming', label: 'UPCOMING' },
  { id: 'past', label: 'PAST' },
];

export default function MyBookingsPage() {
  const [tab, setTab] = useState('upcoming');

  const visible = ALL_BOOKINGS.filter((b) => (tab === 'all' ? true : b.tab === tab));

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
        {visible.length === 0 && (
          <div className="bg-surface-container-lowest rounded-xl p-12 text-center text-on-surface-variant">
            No bookings in this category yet.
          </div>
        )}

        {visible.map((b) => {
          const cancelled = b.status === 'cancelled';
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
                <img
                  alt=""
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  src={b.image}
                />
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
                    <h3 className="font-headline font-semibold text-2xl text-on-surface mb-1">
                      {b.venue}
                    </h3>
                    <p className="font-body text-secondary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      {b.address}
                    </p>
                  </div>
                  <div className="text-right shrink-0 hidden md:block">
                    <span
                      className={`text-2xl font-headline font-bold ${
                        cancelled ? 'text-secondary line-through' : 'text-on-surface'
                      }`}
                    >
                      ${b.amount}
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
                      {b.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-label text-secondary mb-1">TIME</p>
                    <p className="font-body font-medium text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        schedule
                      </span>
                      {b.time}
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
                    <button className="w-full md:w-auto text-error font-body font-medium py-3 px-6 hover:bg-error-container/50 rounded-xl transition-colors">
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
