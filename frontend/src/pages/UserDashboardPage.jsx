import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const RECENT_BOOKINGS = [
  {
    id: 1,
    venue: 'Westside Turf - Pitch B',
    meta: 'Oct 12 • 5v5 Casual',
    amount: 45.0,
    icon: 'sports_soccer',
    tone: 'bg-primary-container text-on-primary-container',
  },
  {
    id: 2,
    venue: 'North Park Courts - Court 1',
    meta: 'Oct 05 • Singles Match',
    amount: 30.0,
    icon: 'sports_tennis',
    tone: 'bg-secondary-container text-on-secondary-container',
  },
];

export default function UserDashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Player';

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-12 space-y-12">
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight">
            Welcome back, {firstName}
          </h2>
          <p className="font-body text-secondary mt-2 text-lg">Your next match is coming up soon.</p>
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
        <div className="md:col-span-2 bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden group min-h-[280px]">
          <div className="absolute inset-0 z-0 opacity-20">
            <img
              alt=""
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMPW1kSr_FVokACurMfBLSrJEGWd1baHWkQQc5eEodml-Vf-uvkTZ9YioqdqP9LCmWhL28RfYs7W9F7LPrxcdtDvGG8Dmp-qvU01QBLvUYj1T1nLj4Bi0QiRpU0UL0HOR21DHyhH3aQ2FGWzPd1kAOviKDBRhN2sGUG3yC9pSvDAnKqGL59_Ekc5hWMEEDFsAex76GPfBXGMerO2wV8625gUKCFHLTl_c0cnTLGlCYn5enWrcl_-PmSMVeMCicoTtaN2D6F99q_Z4F"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent z-0" />
          <div className="relative z-10 flex flex-col h-full justify-between gap-12">
            <div className="flex justify-between items-start">
              <span className="font-label text-xs font-bold bg-primary text-on-primary px-3 py-1 rounded-full uppercase tracking-widest">
                Upcoming Match
              </span>
              <span className="font-body text-secondary font-medium">Tonight, 8:00 PM</span>
            </div>
            <div>
              <h3 className="font-headline text-2xl font-bold mb-2">Downtown Arena - Pitch A</h3>
              <div className="flex items-center gap-4 text-secondary mb-6">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">group</span>
                  <span className="font-body text-sm">5v5 Match</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span className="font-body text-sm">City Center</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Link
                  to="/my-bookings"
                  className="px-6 py-2 bg-secondary-container text-on-secondary-container rounded-xl font-headline font-semibold text-sm hover:bg-surface-variant transition-colors"
                >
                  View Details
                </Link>
                <button className="px-6 py-2 text-primary font-headline font-semibold text-sm hover:underline underline-offset-4">
                  Invite Friends
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Weather card */}
        <div className="bg-surface-container-low rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-headline font-semibold text-lg mb-4">Playing Conditions</h3>
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
        <div className="md:col-span-3 bg-surface-container-lowest rounded-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline font-semibold text-xl">Recent Bookings</h3>
            <Link
              to="/my-bookings"
              className="text-primary font-headline font-semibold text-sm hover:underline underline-offset-4"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {RECENT_BOOKINGS.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl hover:bg-surface-variant transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${b.tone}`}>
                    <span className="material-symbols-outlined">{b.icon}</span>
                  </div>
                  <div>
                    <p className="font-headline font-semibold">{b.venue}</p>
                    <p className="font-body text-sm text-secondary">{b.meta}</p>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="font-headline font-bold text-on-surface">${b.amount.toFixed(2)}</p>
                  <span className="font-label text-[10px] text-primary font-bold tracking-widest">
                    COMPLETED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
