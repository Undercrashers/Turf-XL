import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { turfApi } from '../api/turfApi.js';
import { useAuth } from '../hooks/useAuth.js';

const todayIso = () => new Date().toISOString().slice(0, 10);

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [turfs, setTurfs] = useState([]);
  const [turfsError, setTurfsError] = useState('');
  const [selectedTurfId, setSelectedTurfId] = useState('');
  const [sport, setSport] = useState('football');
  const [date, setDate] = useState(todayIso());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await turfApi.list();
        if (cancelled) return;
        const list = Array.isArray(data) ? data : [];
        setTurfs(list);
        if (list.length) setSelectedTurfId(String(list[0].id));
      } catch (err) {
        if (!cancelled) setTurfsError(err?.response?.data?.message || 'Could not load venues');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedTurf = useMemo(
    () => turfs.find((t) => String(t.id) === String(selectedTurfId)),
    [turfs, selectedTurfId]
  );

  const handleSearch = () => {
    if (!selectedTurfId) return;
    navigate(`/turfs/${selectedTurfId}`, { state: { date, sport } });
  };

  const primaryCtaTarget = isAuthenticated
    ? `/turfs/${selectedTurfId || (turfs[0]?.id ?? 1)}`
    : '/login';

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[921px] flex items-center justify-center pt-24 overflow-hidden bg-surface-container-low">
        <div className="absolute inset-0 z-0">
          <img
            alt=""
            className="w-full h-full object-cover opacity-60"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIIHE03wMZZwJKnHHECNw0_qOrXQLuyDyALYYxlv_Ws8EyxKygGn-HCFaaupEBOKubELhNUiqApSmq5hRuAkxgP3SelNi1P5sFK2qwPimZiGaCf5z1lWgw-PvjJQISeOTdujMO1vbynWk9zpP75Z1Fjl9OjovjvsuvXpcoIMD2P-KIt7SOFB3U8uXzSUMywSERSQ1uGpvr8uMaW4qQpCBsG3EAerA6PF0h690ac9qOfHls1DaF5WKkzaMVWcb-PLGjakuyr9njzRf1"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-highest/80 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-label text-sm font-bold text-on-surface tracking-widest uppercase">
                The Elite Arena
              </span>
            </div>
            <h1
              className="font-headline text-5xl md:text-7xl font-bold text-on-surface tracking-tight leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Dominate <br />
              <span className="text-primary">The Turf.</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-lg leading-relaxed">
              Experience premium facilities, seamless booking, and the thrill of the game. Your next
              match starts here.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to={primaryCtaTarget}
                className="bg-gradient-primary text-on-primary px-8 py-4 rounded-full font-headline font-semibold text-lg shadow-xl shadow-primary/30 hover:scale-105 transition-all duration-300"
              >
                Book Your Slot Now
              </Link>
              <Link
                to="/turfs/1"
                className="px-8 py-4 rounded-full font-headline font-semibold text-primary border border-outline-variant hover:bg-surface-container transition-colors"
              >
                Explore Venues
              </Link>
            </div>
          </div>

          {/* Quick Search */}
          <div className="bg-surface/70 backdrop-blur-2xl p-8 rounded-[2rem] border border-outline-variant/20 shadow-ambient relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10" />
            <h3 className="font-headline text-2xl font-semibold mb-6 text-on-surface">Find a Pitch</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  Location
                </label>
                <div className="flex items-center gap-3 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 focus-within:border-primary/40 transition-colors">
                  <span className="material-symbols-outlined text-secondary">location_on</span>
                  <select
                    value={selectedTurfId}
                    onChange={(e) => setSelectedTurfId(e.target.value)}
                    disabled={!turfs.length}
                    className="bg-transparent border-none focus:ring-0 w-full text-on-surface font-body outline-none appearance-none cursor-pointer disabled:cursor-not-allowed"
                  >
                    {turfs.length === 0 && (
                      <option value="">
                        {turfsError ? 'Could not load venues' : 'Loading venues…'}
                      </option>
                    )}
                    {turfs.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                        {t.address ? ` — ${t.address}` : ''}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined text-on-surface-variant pointer-events-none">
                    expand_more
                  </span>
                </div>
                {selectedTurf && (
                  <p className="font-body text-xs text-on-surface-variant pl-1">
                    ₹{Number(selectedTurf.pricePerHour ?? 0).toLocaleString('en-IN')} / hour
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  Sport
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSport('football')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl font-body font-medium transition-colors ${
                      sport === 'football'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-highest text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined">sports_soccer</span>
                    Football
                  </button>
                  <button
                    type="button"
                    onClick={() => setSport('cricket')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl font-body font-medium transition-colors ${
                      sport === 'cricket'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-highest text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined">sports_cricket</span>
                    Cricket
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  Date
                </label>
                <div className="flex items-center gap-3 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 focus-within:border-primary/40 transition-colors">
                  <span className="material-symbols-outlined text-secondary">calendar_month</span>
                  <input
                    type="date"
                    value={date}
                    min={todayIso()}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent border-none focus:ring-0 w-full text-on-surface font-body cursor-pointer outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={!selectedTurfId}
                className="w-full bg-tertiary-fixed-dim text-on-tertiary-fixed-variant py-4 rounded-xl font-headline font-bold text-lg hover:brightness-105 transition-all shadow-lg shadow-tertiary/10 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Search Availability
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Turfs */}
      <section className="py-24 bg-surface relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="font-headline text-4xl font-bold text-on-surface mb-4">Featured Venues</h2>
              <p className="font-body text-on-surface-variant">Top-rated pitches ready for action.</p>
            </div>
            <button className="text-primary font-headline font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All Venues
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          {turfs.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-xl p-12 text-center text-on-surface-variant">
              {turfsError ? turfsError : 'Loading venues…'}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {turfs.map((turf) => (
                <div
                  key={turf.id}
                  className="group bg-surface-container-lowest rounded-[1.5rem] overflow-hidden shadow-ambient hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden bg-surface-container-low">
                    {turf.coverImageUrl && (
                      <img
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src={turf.coverImageUrl}
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-headline text-xl font-bold text-on-surface mb-1">
                          {turf.name}
                        </h3>
                        <p className="font-body text-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">location_on</span>
                          {turf.address}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-headline font-bold text-lg text-primary">
                          ₹{Number(turf.pricePerHour ?? 0).toLocaleString('en-IN')}
                        </div>
                        <div className="font-body text-xs text-on-surface-variant">per hour</div>
                      </div>
                    </div>
                    {turf.description && (
                      <p className="font-body text-sm text-on-surface-variant mb-6 line-clamp-2">
                        {turf.description}
                      </p>
                    )}
                    <Link
                      to={`/turfs/${turf.id}`}
                      className="block text-center w-full font-headline font-semibold py-3 rounded-xl transition-colors bg-surface-container-high text-on-surface group-hover:bg-primary group-hover:text-on-primary"
                    >
                      Book Slot
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
