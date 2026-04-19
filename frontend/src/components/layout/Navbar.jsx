import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-black tracking-tighter text-primary-container font-headline">
          Turf XL
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-on-surface-variant font-medium hover:text-primary transition-colors">Home</Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="text-on-surface-variant font-medium hover:text-primary transition-colors">Dashboard</Link>
              <Link to="/my-bookings" className="text-on-surface-variant font-medium hover:text-primary transition-colors">My Bookings</Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline text-sm text-secondary">{user?.name || user?.email}</span>
              <button
                onClick={handleLogout}
                className="bg-gradient-primary text-on-primary px-6 py-2 rounded-full font-headline font-semibold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-primary text-on-primary px-6 py-2 rounded-full font-headline font-semibold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
