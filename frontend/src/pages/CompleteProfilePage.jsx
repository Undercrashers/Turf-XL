import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService.js';
import { useAuth } from '../hooks/useAuth.js';
import { isValid10DigitPhone } from '../utils/validators.js';

export default function CompleteProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const email = location.state?.email || '';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) return setError('Name is required');
    if (!isValid10DigitPhone(phone)) return setError('Enter a valid 10-digit phone number');
    try {
      setLoading(true);
      const res = await authService.completeProfile({
        email,
        name,
        phone: `+91${phone.trim()}`,
      });
      login(res.token, res.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <span className="material-symbols-outlined text-4xl text-primary mb-2 fill">person</span>
        <h2 className="mt-2 text-3xl font-bold font-headline text-on-surface">Complete Profile</h2>
        <p className="mt-2 text-sm text-on-surface-variant font-body leading-relaxed">
          Just a few more details to finalize your account and get you onto the pitch.
        </p>
      </div>

      <form className="mt-2 space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="space-y-5">
          <div>
            <label
              htmlFor="full-name"
              className="block text-sm font-bold font-label uppercase tracking-widest text-on-surface mb-2"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-outline-variant">badge</span>
              </div>
              <input
                id="full-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Priyanshu De"
                required
                className="block w-full pl-10 pr-3 py-3 text-base bg-surface-container-low rounded-lg border border-transparent focus:border-outline-variant/40 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone-number"
              className="block text-sm font-bold font-label uppercase tracking-widest text-on-surface mb-2"
            >
              Phone Number
            </label>
            <div className="flex items-stretch bg-surface-container-low rounded-lg border border-transparent focus-within:border-outline-variant/40 transition-all overflow-hidden">
              <span className="flex items-center pl-3 text-outline-variant">
                <span className="material-symbols-outlined">phone_iphone</span>
              </span>
              <span className="flex items-center px-3 font-body text-on-surface-variant select-none">
                +91
              </span>
              <input
                id="phone-number"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="9876543210"
                required
                className="flex-1 min-w-0 pr-3 py-3 text-base bg-transparent border-0 focus:ring-0 outline-none"
              />
            </div>
            <p className="mt-2 text-xs text-on-surface-variant font-body">
              We&apos;ll use this for booking confirmations and important updates.
            </p>
          </div>
        </div>

        {error && <p className="text-sm text-error">{error}</p>}

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-primary text-on-primary rounded-xl w-full flex justify-center py-4 px-4 text-sm font-bold font-headline hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? 'Saving...' : 'Continue to Dashboard'}
          </button>
        </div>
      </form>
    </>
  );
}
