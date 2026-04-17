import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/layout/AdminSidebar.jsx';

export default function AdminLayout() {
  return (
    <div className="bg-surface text-on-surface font-body antialiased flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 flex flex-col overflow-hidden bg-surface relative">
        <header className="md:hidden flex items-center justify-between p-4 bg-zinc-900 text-white sticky top-0 z-40 shadow-md">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-emerald-500 fill">admin_panel_settings</span>
            <h1 className="font-headline font-bold text-lg">Admin Panel</h1>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
