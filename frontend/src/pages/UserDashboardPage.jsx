import { useAuth } from '../hooks/useAuth.js';

export default function UserDashboardPage() {
  const { user } = useAuth();
  return (
    <section>
      <h1 className="text-2xl font-bold">Hi, {user?.name || 'Player'} 👋</h1>
      <p className="text-slate-600">Your bookings and recommended turfs will appear here.</p>
    </section>
  );
}
