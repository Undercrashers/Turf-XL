import { Link, useParams } from 'react-router-dom';

const AMENITIES = [
  { icon: 'directions_car', label: 'Free Parking' },
  { icon: 'wb_incandescent', label: 'LED Floodlights' },
  { icon: 'wc', label: 'Washrooms' },
  { icon: 'local_drink', label: 'Water Station' },
];

const DATES = [
  { label: 'Today', day: '14', active: true },
  { label: 'Tue', day: '15' },
  { label: 'Wed', day: '16' },
  { label: 'Thu', day: '17' },
];

const SLOTS = [
  { time: '18:00 - 19:00', available: false },
  { time: '19:00 - 20:00', available: true },
  { time: '20:00 - 21:00', available: true },
  { time: '21:00 - 22:00', available: true },
];

const REVIEWS = [
  {
    initials: 'JD',
    name: 'Jason D.',
    when: '2 days ago',
    stars: 5,
    body:
      '"Best turf in the city. The lights are perfect for evening games, and the surface is really forgiving on the knees. Highly recommend."',
  },
  {
    initials: 'MR',
    name: 'Marcus R.',
    when: '1 week ago',
    stars: 4.5,
    body:
      '"Great facility. Parking can get a bit tight during peak league hours, but the actual pitch quality is top tier."',
  },
  {
    initials: 'SK',
    name: 'Sarah K.',
    when: '2 weeks ago',
    stars: 5,
    body:
      '"Booked for a casual 7v7. The netting keeps the ball in play beautifully. Will definitely be making this our regular spot."',
  },
];

function Stars({ value }) {
  return (
    <div className="flex items-center gap-1 text-tertiary-container">
      {[1, 2, 3, 4, 5].map((i) => {
        if (i <= Math.floor(value)) {
          return (
            <span key={i} className="material-symbols-outlined text-[20px] fill">
              star
            </span>
          );
        }
        if (i - 0.5 === value) {
          return (
            <span key={i} className="material-symbols-outlined text-[20px]">
              star_half
            </span>
          );
        }
        return (
          <span key={i} className="material-symbols-outlined text-[20px]">
            star
          </span>
        );
      })}
    </div>
  );
}

export default function TurfDetailsPage() {
  const { turfId } = useParams();

  return (
    <main className="pt-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mb-12 relative rounded-[2rem] overflow-hidden bg-surface-container-low h-[614px] min-h-[400px]">
          <img
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5QK40x7LgxUF7sd7_m5VmqDRV7WvP-b4iy4g8GtwafNELhSFYZVWL-2DlppkUTWtFRGcZlmr1w43GXIpRKk0INCU5iQuFw-8V2W5Fe2MfDjQ7glKOTYT2tEbNbhhxfvTnb0Ai4I43Qd-GpdD5-JWGPfsq876kWaUAY2UlzHl8VOaEj3o2LIDxSGe_kW1oiK-s8UR2bsFL7AMLAAD-zJveUsf7_4TNRs7j4NW7KUXlR8E4p9wVYasIZfEEkuDTaL5s5CTl_aDcGG9l"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          <div className="absolute bottom-8 left-8 right-8 md:right-auto md:w-[480px] p-8 rounded-3xl glass-panel text-on-surface">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-xs font-bold uppercase tracking-wider font-label">
                Premium
              </span>
              <span className="flex items-center text-sm font-medium text-secondary">
                <span className="material-symbols-outlined text-[18px] mr-1 text-tertiary-container fill">
                  star
                </span>
                4.9 (128 Reviews)
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-on-surface mb-2 tracking-tight">
              Turf XL Baisakhi
            </h1>
            <p className="text-lg text-on-surface-variant mb-6 flex items-center">
              <span className="material-symbols-outlined mr-2">location_on</span>
              Baisakhi, Salt Lake, Kolkata
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full text-sm font-medium">
                <span className="material-symbols-outlined text-[20px] text-primary">groups</span>
                7v7 Format
              </div>
              <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full text-sm font-medium">
                <span className="material-symbols-outlined text-[20px] text-primary">straighten</span>
                40m x 25m
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
              <p className="text-base leading-relaxed text-secondary mb-6">
                Experience the pinnacle of urban football at Turf XL Baisakhi. Featuring FIFA-certified 4G
                artificial grass, this arena is designed for fast-paced, high-intensity play. The
                surface offers exceptional grip and shock absorption, ensuring peak performance and
                reduced injury risk regardless of weather conditions.
              </p>
              <p className="text-base leading-relaxed text-secondary">
                Enclosed by heavy-duty netting and illuminated by state-of-the-art LED floodlights, you
                can play well into the night without losing sight of the ball.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold font-headline mb-6 text-on-surface">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {AMENITIES.map((a) => (
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

            <section className="bg-surface-container-lowest p-8 rounded-3xl">
              <h2 className="text-2xl font-semibold font-headline mb-6 text-on-surface">Location</h2>
              <div className="w-full h-64 bg-surface-container-high rounded-2xl overflow-hidden relative">
                <img
                  alt=""
                  className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC5aVAIHTABXlkQr7cy2r7VuOvL9FOqgfd6mJ2CJuI694huVxqEExefAttPHYd0wtyvBIXRTkVALLpkdwR0gDTD84LZDcsbz08PPjQAy4ZT1Ug4nk6VIj8oF-mb1qFTqZWyTMd7j3u_OV70gv1A4_Hiver0t0bx1TItH5e4tOpMv-PV6g6zWtppP4LskgUJcE-BmvvsUgb5eHxJOjHjKkE0jRl-wYZhCJ7tBl1RU0w3kXqtrMQEffSWjifdND-UIh23Mj6Ysd_I4Qe"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                    <span className="material-symbols-outlined text-on-primary fill">location_on</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right booking panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-surface-container-lowest p-8 rounded-3xl shadow-ambient border border-outline-variant/15">
              <div className="flex justify-between items-baseline mb-6">
                <h3 className="text-3xl font-bold font-headline text-on-surface tracking-tight">
                  ₹1,200
                  <span className="text-lg text-secondary font-medium font-body">/hour</span>
                </h3>
                <span className="text-sm font-bold text-primary bg-primary-container/10 px-3 py-1 rounded-full font-label uppercase tracking-widest">
                  Available
                </span>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-on-surface-variant mb-3">
                  Select Date
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar">
                  {DATES.map((d) => (
                    <button
                      key={d.day}
                      className={`flex-shrink-0 w-16 p-3 rounded-2xl text-center transition-colors ${
                        d.active
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      <div className={`text-xs mb-1 ${d.active ? 'opacity-80' : 'text-secondary'}`}>
                        {d.label}
                      </div>
                      <div className="text-xl font-bold font-headline">{d.day}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-on-surface-variant mb-3">
                  Available Times
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {SLOTS.map((s) => (
                    <button
                      key={s.time}
                      disabled={!s.available}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors border ${
                        s.available
                          ? 'bg-surface-container-low hover:bg-surface-container text-on-surface border-transparent hover:border-outline-variant/30'
                          : 'bg-surface-container-high text-on-surface-variant opacity-50 cursor-not-allowed line-through border-transparent'
                      }`}
                    >
                      {s.time}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to={`/turfs/${turfId}/book`}
                className="block text-center w-full py-4 rounded-xl bg-gradient-primary text-on-primary font-bold text-lg tracking-wide shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
              >
                Book Now
              </Link>
              <p className="text-center text-xs text-secondary mt-4">
                Free cancellation up to 24 hours before.
              </p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold font-headline text-on-surface">Player Reviews</h2>
            <button className="text-primary font-medium hover:text-primary-container transition-colors flex items-center">
              View All <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div
                key={r.initials}
                className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/15"
              >
                <div className="mb-3">
                  <Stars value={r.stars} />
                </div>
                <p className="text-on-surface mb-4">{r.body}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-secondary font-bold font-headline">
                    {r.initials}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-on-surface">{r.name}</div>
                    <div className="text-xs text-secondary">{r.when}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
