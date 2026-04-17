import { Link } from 'react-router-dom';

const FEATURED_TURFS = [
  {
    id: 1,
    name: 'Salt Lake Arena',
    location: 'Sector V, Kolkata',
    price: 1200,
    rating: 4.9,
    available: true,
    tags: ['5v5 Football', 'Turf'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAMNUMOvFYITmVisHHSN8X6PODyo8Zgi0lO61EKDvF8ZxZLcsIy7xzIxm4_qfzLfPKNWMBri2iLAD2wPiUPTrOSK9xu4on9PbgipXqh0Wk5bon6PjIMQKgy0agyOZgD0KlGs_QXHV62ECV0AL_-eP4j7VRARGXHLfyqDZJ2W26QKBI2kNZE9rB2DFiIE5_x8sn0_PhlMHJ8s5z1jQxKsLzcBgkrYlgYbPGG9oYdML0HGRwI0bTLiOrcOtt1eVR3DBI_vmv1kRL8BB7q',
  },
  {
    id: 2,
    name: 'Elite Sports Hub',
    location: 'New Town, Kolkata',
    price: 1500,
    rating: 4.8,
    available: false,
    tags: ['7v7 Football', 'Cricket'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVXR-3XpIMZHKJUcaosiFf3GhsEoJRrsBr5x2SU0dqlsCZ9GohtYV9aYOEBRXWASmCn7bHby-oWJsB-1QOraiDLs5vzBVZhL3rs-g8RE-d-fZdPN0VwOto0HZeUqX83lZmljfRi43S6uofEMzSdkbGMGbdRZevULxd-F3rZOklTkqBFNc6t85x6gxVBc2MIFy-AGOp34XmWypbV8ypw-kYbsEOz9UBAKNm34NtRrlcREsYw7yh7Tqd9eiCCOs4HneLufdhd7j-xQvA',
  },
  {
    id: 3,
    name: 'Park Circus Pitch',
    location: 'Park Circus, Kolkata',
    price: 1000,
    rating: 4.7,
    available: true,
    tags: ['Box Cricket', '5v5 Football'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDHKlcuZwVXzONiXuEI2lVkP69aw30Orz3KGxmU_KLSDcqz91LiblkyrfTAFATLWObXCenj1Tz-2ienlWCzW-MdcMgG-x1eiiBNozYEdTiuaJjt2BO9tQkEn9qPO1jPd72JR6-tCenfcXBiGhjsHanySobDbtnELR37QUSDtblYxbEVnTaX56PO6PY62EHcCrK27QfZkdVKDoUAOSsJ0D1Wari2oTSHThTIPcerqS8mkC6EtlyS17nDiBhx_RlQTCB0AMWqWZKeB0gY',
  },
];

export default function HomePage() {
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
                to="/login"
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
                  <input
                    className="bg-transparent border-none focus:ring-0 w-full text-on-surface placeholder:text-on-surface-variant/50 font-body outline-none"
                    placeholder="e.g. Salt Lake, Kolkata"
                    type="text"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  Sport
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-primary text-on-primary font-body font-medium transition-colors">
                    <span className="material-symbols-outlined">sports_soccer</span>
                    Football
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-surface-container-highest text-on-surface hover:bg-surface-container transition-colors font-body font-medium">
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
                    className="bg-transparent border-none focus:ring-0 w-full text-on-surface font-body cursor-pointer outline-none"
                  />
                </div>
              </div>

              <button className="w-full bg-tertiary-fixed-dim text-on-tertiary-fixed-variant py-4 rounded-xl font-headline font-bold text-lg hover:brightness-105 transition-all shadow-lg shadow-tertiary/10 mt-4">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_TURFS.map((turf) => (
              <div
                key={turf.id}
                className="group bg-surface-container-lowest rounded-[1.5rem] overflow-hidden shadow-ambient hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={turf.image}
                  />
                  <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-tertiary text-sm fill">star</span>
                    <span className="font-body font-semibold text-sm text-on-surface">
                      {turf.rating}
                    </span>
                  </div>
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full font-label text-xs font-bold tracking-wider ${
                      turf.available ? 'bg-primary text-on-primary' : 'bg-error text-on-error'
                    }`}
                  >
                    {turf.available ? 'AVAILABLE' : 'BOOKED'}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-headline text-xl font-bold text-on-surface mb-1">
                        {turf.name}
                      </h3>
                      <p className="font-body text-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">location_on</span>
                        {turf.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-headline font-bold text-lg text-primary">
                        ₹{turf.price.toLocaleString('en-IN')}
                      </div>
                      <div className="font-body text-xs text-on-surface-variant">per hour</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-6">
                    {turf.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-surface-container px-3 py-1 rounded-full font-body text-xs text-on-surface"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/turfs/${turf.id}`}
                    className={`block text-center w-full font-headline font-semibold py-3 rounded-xl transition-colors ${
                      turf.available
                        ? 'bg-surface-container-high text-on-surface group-hover:bg-primary group-hover:text-on-primary'
                        : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed opacity-70'
                    }`}
                  >
                    {turf.available ? 'Book Slot' : 'Check Availability'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
