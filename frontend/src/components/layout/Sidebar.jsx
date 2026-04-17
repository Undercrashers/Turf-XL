import { NavLink } from 'react-router-dom';

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/turfs', label: 'Turfs' },
  { to: '/admin/slots', label: 'Slots' },
  { to: '/admin/bookings', label: 'Bookings' },
  { to: '/admin/users', label: 'Users' },
];

export default function Sidebar() {
  return (
    <aside className="w-56 bg-secondary text-white p-4">
      <nav className="flex flex-col gap-2 text-sm">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `rounded px-3 py-2 ${isActive ? 'bg-primary' : 'hover:bg-slate-700'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
