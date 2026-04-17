import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          alt=""
          className="w-full h-full object-cover object-center opacity-60"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCoalw9nOxAlpYimA4sZuG_MRSYjrOCqw33u50MmTC8I_atPy6ACnL7JHifH3Z3uVzOl9WWHyEmJp-WRXANworUfd4H7llWvNsJHQSxvpRyobQxTKaaGB67wem1p8Js4E-LKipwNaEM6n2IydzB6GeKAJ3BZYdRsG5zxjtDYA7aSXHkJIroqT3oqZQ1K9fD2ZMD8T3hskgu3V-4hdJ9UX9vi5IWjcmr6B74p1XOmjMlseMwjjtVbRwoQE-GJUSE6dSjfqUl3b4upVf"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-surface/90 via-surface/70 to-surface/40 backdrop-blur-[8px]" />
      </div>
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="mb-10 text-center">
          <Link to="/" className="font-headline font-extrabold text-4xl tracking-tighter text-primary-container mb-2 drop-shadow-sm block">
            Turf XL
          </Link>
          <p className="font-body text-on-surface-variant text-lg">The Elite Arena.</p>
        </div>
        <div className="bg-surface-container-lowest/80 backdrop-blur-2xl rounded-xl p-8 sm:p-10 shadow-ambient border border-outline-variant/15">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
