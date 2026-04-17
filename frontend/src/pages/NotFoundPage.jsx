import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen flex items-center justify-center selection:bg-primary selection:text-on-primary">
      <main className="w-full min-h-screen flex flex-col md:flex-row relative overflow-hidden">
        <div className="w-full md:w-[45%] flex flex-col justify-center px-8 md:px-20 lg:px-32 z-10 bg-surface py-16">
          <div className="mb-4">
            <span className="font-headline font-bold text-sm tracking-[0.05em] text-primary uppercase">
              Whistle Blown
            </span>
          </div>
          <h1 className="font-headline font-bold text-8xl md:text-[10rem] leading-none tracking-[-0.04em] text-surface-container-high mb-2">
            404
          </h1>
          <h2 className="font-headline font-bold text-4xl md:text-5xl text-on-surface tracking-tight mb-6">
            Out of Bounds.
          </h2>
          <p className="font-body text-secondary text-lg leading-[1.6] max-w-md mb-12">
            The play you&apos;re looking for has been stopped. The pitch might have been renamed,
            moved, or is currently undergoing maintenance. Let&apos;s get you back in the action.
          </p>
          <div>
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-gradient-primary text-on-primary font-body font-medium text-lg px-10 py-5 rounded-xl shadow-ambient hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,107,44,0.15)] transition-all duration-300"
            >
              <span className="material-symbols-outlined mr-3 text-xl fill">stadium</span>
              Return to the Arena
            </Link>
          </div>
        </div>
        <div className="hidden md:block w-full md:w-[55%] relative">
          <div className="absolute inset-0 bg-surface/20 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-transparent z-10 w-32" />
          <img
            alt=""
            className="w-full h-full object-cover object-left"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxgvy1JIhd2XfQbjJK8tFXEauSmRlaGh-ME8V-T6_oq306v8nFOTa43PGlD2i8ORzxVw5OPV6vIn223UGmNw1ZH1cRWU0zo5lLdwYi_t4HdkyHLBEKPzlG1jg6mCS9lA05J5pL7Gefk-BOfc2IORmINt83mSKJWlwqixH7hRcFxTqJAU2rz0bybN9F76w1AFj2cZU4iQI3URMo1Dbb0nSU6muhCOa3gxRF0qr_p8cFbptRFALSFFnYwXJW5dajGuWfNxlC5C_9a5yc"
          />
        </div>
      </main>
    </div>
  );
}
