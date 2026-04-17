import { Outlet } from 'react-router-dom';
import UserSidebar from '../components/layout/UserSidebar.jsx';

export default function DashboardLayout() {
  return (
    <div className="bg-surface text-on-surface font-body antialiased flex min-h-screen">
      <UserSidebar />
      <main className="flex-1 overflow-y-auto bg-surface relative">
        <header className="md:hidden flex justify-between items-center px-6 py-4 bg-surface-container-low sticky top-0 z-10">
          <h1 className="font-headline text-xl font-bold text-primary">Turf XL</h1>
          <button className="text-on-surface">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
