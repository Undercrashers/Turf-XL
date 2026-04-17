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
    <header className="bg-white border-b border-slate-200">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-primary">
          Turf XL
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/my-bookings">My Bookings</Link>
              <span className="text-slate-500">{user?.name || user?.email}</span>
              <button onClick={handleLogout} className="text-red-600">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-primary font-medium">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
