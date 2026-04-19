const BARS = [
  { label: 'Mon', pct: 30 },
  { label: 'Tue', pct: 45 },
  { label: 'Wed', pct: 80, accent: true },
  { label: 'Thu', pct: 60 },
  { label: 'Fri', pct: 50 },
  { label: 'Sat', pct: 90 },
  { label: 'Sun', pct: 75 },
];

const ACTIVITY = [
  {
    icon: 'add_circle',
    tint: 'bg-primary/10 text-primary',
    title: 'New Booking: Pitch A (8:00 PM)',
    meta: 'By John Doe • 2 mins ago',
  },
  {
    icon: 'warning',
    tint: 'bg-tertiary/10 text-tertiary',
    title: 'Cancellation: Pitch C (6:00 PM)',
    meta: 'By Sarah Smith • 15 mins ago',
  },
  {
    icon: 'update',
    tint: 'bg-surface-container-high text-secondary',
    title: 'System Update: Pricing synced',
    meta: 'Auto-system • 1 hr ago',
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline font-bold text-3xl md:text-4xl text-on-surface tracking-tight">
            Platform Overview
          </h2>
          <p className="font-body text-secondary mt-2">
            Live metrics and system status across all venues.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-full text-sm font-label font-bold text-primary shadow-ambient">
            <span className="w-2 h-2 rounded-full bg-primary-fixed-dim animate-pulse" />
            SYSTEM OPTIMAL
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">book_online</span>
              </div>
              <span className="bg-surface-container-low text-primary px-2 py-1 rounded text-xs font-bold">
                +12% Today
              </span>
            </div>
            <div>
              <p className="font-body text-secondary text-sm font-medium">Total Bookings (MTD)</p>
              <h3 className="font-headline font-bold text-4xl text-on-surface tracking-tight mt-1">
                1,284
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-primary text-on-primary p-6 rounded-xl relative overflow-hidden shadow-ambient">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-90" />
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-xl" />
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-bold">
                +8% vs Last Wk
              </span>
            </div>
            <div>
              <p className="font-body text-primary-fixed font-medium text-sm">Platform Revenue</p>
              <h3 className="font-headline font-bold text-4xl tracking-tight mt-1">₹42.5k</h3>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-tertiary/5 rounded-full blur-2xl group-hover:bg-tertiary/10 transition-colors" />
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined">sports_soccer</span>
              </div>
              <span className="bg-surface-container-low text-secondary px-2 py-1 rounded text-xs font-bold">
                Live Now
              </span>
            </div>
            <div>
              <p className="font-body text-secondary text-sm font-medium">Active / Total Slots</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="font-headline font-bold text-4xl text-on-surface tracking-tight">
                  86
                </h3>
                <span className="font-body text-secondary text-lg">/ 120</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-container-lowest rounded-xl p-6 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline font-semibold text-xl text-on-surface">Booking Trends</h3>
              <div className="flex gap-2">
                {['7D', '30D', 'YTD'].map((t, i) => (
                  <button
                    key={t}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      i === 1
                        ? 'bg-primary/10 text-primary'
                        : 'bg-surface-container-low text-secondary hover:bg-surface-container'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-64 flex items-end justify-between gap-2 px-2 pb-6 border-b border-outline-variant/30 relative">
              <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-secondary opacity-70">
                <span>150</span>
                <span>100</span>
                <span>50</span>
              </div>
              <div className="absolute left-8 right-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
                <div className="w-full border-b border-outline-variant/15" />
                <div className="w-full border-b border-outline-variant/15" />
                <div className="w-full border-b border-outline-variant/15" />
              </div>
              <div className="w-full flex justify-between items-end gap-1 sm:gap-2 lg:gap-4 pl-8 h-full z-10">
                {BARS.map((b) => (
                  <div
                    key={b.label}
                    style={{ height: `${b.pct}%` }}
                    className={`w-full rounded-t-sm transition-colors ${
                      b.accent
                        ? 'bg-primary/80 hover:bg-primary'
                        : 'bg-surface-container-high hover:bg-primary-container'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between pl-8 pr-2 pt-3 text-xs font-medium text-secondary">
              {BARS.map((b) => (
                <span key={b.label}>{b.label}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl hover:bg-surface-container-low transition-colors group text-left border border-outline-variant/15">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">calendar_month</span>
                </div>
                <div>
                  <h4 className="font-body font-medium text-on-surface">Manage Slots</h4>
                  <p className="text-xs text-secondary mt-0.5">Edit availability &amp; pricing</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors">
                chevron_right
              </span>
            </button>

            <button className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl hover:bg-surface-container-low transition-colors group text-left border border-outline-variant/15">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center group-hover:bg-tertiary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">fact_check</span>
                </div>
                <div>
                  <h4 className="font-body font-medium text-on-surface">Review Bookings</h4>
                  <p className="text-xs text-secondary mt-0.5">Approve or cancel requests</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-secondary group-hover:text-tertiary transition-colors">
                chevron_right
              </span>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient border border-outline-variant/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline font-semibold text-lg text-on-surface">
                Recent Activity
              </h3>
              <button className="text-primary text-sm font-medium hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {ACTIVITY.map((a) => (
                <div key={a.title} className="flex gap-4 items-start">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${a.tint}`}
                  >
                    <span className="material-symbols-outlined text-sm">{a.icon}</span>
                  </div>
                  <div>
                    <p className="font-body text-sm text-on-surface">
                      <span className="font-semibold">{a.title.split(':')[0]}:</span>
                      {a.title.split(':').slice(1).join(':')}
                    </p>
                    <p className="text-xs text-secondary mt-1">{a.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl overflow-hidden relative group h-48">
            <img
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFcSZIgxrpsUjqppkyW_ygBGsnlvPxkrcN355cd9fgerm69MI_nluql25dzjID5cGo5X9S7SSXziP_q3NMhsgmS4i6e-PeTRdWI56kLxZR6SShVB5OVRR305c3EYHM_F8KMWZmgo5t65yEUADbwDwR9gdjJa8nCLhah_8djtr0eec3rYljl_ryGLRzIOAOSYlT13O0EEKIGVgLGBuaDer0bNaMOjBRSquYxM5FKQnkPbLJrk3k1eUClIP4W46N5dMlxAdG3mJV8_z0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 w-full">
              <span className="bg-tertiary text-on-tertiary text-[10px] font-label font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">
                High Demand
              </span>
              <h4 className="font-headline text-white font-bold text-lg leading-tight">
                Pitch B is currently trending
              </h4>
              <p className="text-white/80 text-xs mt-1 font-body">
                Consider adjusting prime-time rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
