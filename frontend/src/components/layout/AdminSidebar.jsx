import { NavLink } from 'react-router-dom';

const links = [
  { to: '/admin', label: 'Admin Overview', icon: 'admin_panel_settings', end: true },
  { to: '/admin/venues', label: 'Venue Management', icon: 'location_on' },
  { to: '/admin/bookings', label: 'Bookings', icon: 'book_online' },
  { to: '/admin/slots', label: 'Slots', icon: 'calendar_month' },
  { to: '/admin/users', label: 'User Analytics', icon: 'group' },
  { to: '/admin/logs', label: 'System Logs', icon: 'history' },
];

export default function AdminSidebar() {
  return (
    <nav className="bg-zinc-900 text-emerald-500 font-headline uppercase tracking-widest text-xs h-screen w-20 md:w-72 shadow-2xl flex-col border-r border-zinc-800 transition-all duration-300 hidden md:flex flex-shrink-0 z-40 sticky top-0">
      <div className="p-6 pb-2 border-b border-zinc-800/50 mb-4">
        <h1 className="text-white font-black text-2xl tracking-tighter hidden md:block">Turf XL</h1>
        <h1 className="text-white font-black text-xl tracking-tighter md:hidden text-center">TX</h1>
        <p className="text-zinc-500 text-[10px] mt-1 hidden md:block">System Control</p>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-r-lg border-l-4 transition-colors ${
                isActive
                  ? 'bg-zinc-800 text-emerald-400 border-emerald-500'
                  : 'text-zinc-400 hover:bg-zinc-800 border-transparent'
              }`
            }
          >
            <span className="material-symbols-outlined text-xl">{link.icon}</span>
            <span className="hidden md:block font-bold">{link.label}</span>
          </NavLink>
        ))}
      </div>
      <div className="p-4 border-t border-zinc-800/50 mt-auto">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 flex-shrink-0">
            <span className="material-symbols-outlined">person</span>
          </div>
          <div className="hidden md:block overflow-hidden">
            <p className="text-white font-semibold text-sm truncate">Admin User</p>
            <p className="text-zinc-500 text-[10px] truncate">Super Admin</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
