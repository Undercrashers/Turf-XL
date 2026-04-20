import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi.js';
import { useAuth } from '../hooks/useAuth.js';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    try {
      setLoading(true);
      const res = await authApi.adminLogin(email, password);
      if (!res?.token || !res?.user) {
        throw new Error('Invalid response');
      }
      login(res.token, res.user);
      navigate('/admin');
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-headline text-3xl font-bold text-primary-container mb-2">Turf XL</h1>
          <p className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-widest">
            Admin Portal
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-[1.5rem] p-8 shadow-ambient border border-outline-variant/15">
          <h2 className="font-headline text-2xl font-bold text-on-surface mb-6">Admin Sign In</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="admin-email"
                className="block font-label font-bold text-xs uppercase tracking-widest text-on-surface-variant mb-2"
              >
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@turfxl.com"
                className="block w-full px-4 py-3 bg-surface-container-low rounded-xl border border-transparent focus:border-primary/40 text-on-surface font-body outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block font-label font-bold text-xs uppercase tracking-widest text-on-surface-variant mb-2"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 bg-surface-container-low rounded-xl border border-transparent focus:border-primary/40 text-on-surface font-body outline-none transition-colors"
              />
            </div>

            {error && <p className="text-sm text-error">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold rounded-xl hover:shadow-lg transition-shadow disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-xs text-on-surface-variant text-center">
            Dev credentials:
            <br />
            <code className="font-mono">super.admin@turfxl.com / super123</code>
            <br />
            <code className="font-mono">salt.admin@turfxl.com / admin123</code>
          </p>
        </div>
      </div>
    </div>
  );
}
