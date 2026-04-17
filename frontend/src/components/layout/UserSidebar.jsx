import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/my-bookings', label: 'My Bookings', icon: 'calendar_today' },
  { to: '/', label: 'Venues', icon: 'stadium' },
  { to: '/dashboard/payments', label: 'Payments', icon: 'payments' },
  { to: '/dashboard/settings', label: 'Settings', icon: 'settings' },
];

export default function UserSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const initials = (user?.name || user?.email || 'P')
    .split(/[\s@]/)
    .filter(Boolean)
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <aside className="hidden md:flex flex-col h-screen p-4 gap-2 bg-surface-container-low w-64 sticky top-0">
      <div className="mb-8 px-4 py-2">
        <h1 className="font-headline text-xl font-bold text-primary">Turf XL</h1>
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-headline font-semibold transition-transform hover:translate-x-1 ${
                isActive
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
                  : 'text-secondary hover:bg-surface-container'
              }`
            }
          >
            <span className="material-symbols-outlined">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-4 py-4 bg-surface-container rounded-xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold font-headline">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="font-headline font-semibold text-sm truncate">{user?.name || 'Player'}</p>
          <p className="font-body text-xs text-secondary truncate">{user?.email || 'Member'}</p>
        </div>
      </div>
      <button
        onClick={() => {
          logout();
          navigate('/');
        }}
        className="mt-2 w-full py-3 bg-gradient-primary text-on-primary rounded-xl font-headline font-bold hover:shadow-lg transition-shadow"
      >
        Logout
      </button>
    </aside>
  );
}
