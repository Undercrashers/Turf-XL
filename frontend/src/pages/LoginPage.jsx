import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService.js';
import { isValidEmail } from '../utils/validators.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!isValidEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    try {
      setLoading(true);
      await authService.requestOtp(email);
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="font-headline font-bold text-2xl tracking-tight text-on-surface mb-6 text-center">
        Access the Pitch
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block font-label font-bold text-xs uppercase tracking-[0.05em] text-on-surface-variant mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </span>
            <input
              className="block w-full pl-11 pr-4 py-3 sm:py-4 bg-surface-container-low border-transparent focus:border-transparent focus:ring-0 rounded-lg text-on-surface font-body transition-all duration-200 focus:shadow-[0_0_0_2px_rgba(0,107,44,0.4)] placeholder-on-surface-variant/50 outline-none"
              id="email"
              name="email"
              type="email"
              placeholder="player@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <p className="mt-2 text-xs text-error">{error}</p>}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-4 px-6 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold text-lg hover:from-primary-container hover:to-primary transition-all duration-300 shadow-md disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send OTP'}
            {!loading && <span className="material-symbols-outlined ml-2 text-[20px]">arrow_forward</span>}
          </button>
        </div>
      </form>

      <div className="mt-8 text-center text-sm font-body text-on-surface-variant">
        <p>
          By continuing, you agree to our{' '}
          <a className="text-primary hover:text-primary-container font-medium underline decoration-outline-variant underline-offset-4 transition-colors" href="#">
            Terms
          </a>{' '}
          &amp;{' '}
          <a className="text-primary hover:text-primary-container font-medium underline decoration-outline-variant underline-offset-4 transition-colors" href="#">
            Privacy
          </a>
          .
        </p>
      </div>
    </>
  );
}
