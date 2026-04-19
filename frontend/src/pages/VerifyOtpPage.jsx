import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService.js';
import { useAuth } from '../hooks/useAuth.js';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 165;

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const email = location.state?.email || '';

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputs = useRef([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const setDigitAt = (index, value) => {
    const clean = value.replace(/[^0-9]/g, '').slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = clean;
      return next;
    });
    if (clean && index < OTP_LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, OTP_LENGTH);
    if (pasted.length) {
      e.preventDefault();
      const next = Array(OTP_LENGTH).fill('');
      for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
      setDigits(next);
      inputs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const otp = digits.join('');
    if (otp.length !== OTP_LENGTH) {
      setError('Please enter all 6 digits');
      return;
    }
    try {
      setLoading(true);
      const res = await authService.verifyOtp(email, otp);
      if (res?.isNewUser) {
        navigate('/complete-profile', { state: { email } });
      } else {
        login(res.token, res.user);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    try {
      await authService.requestOtp(email);
      setSecondsLeft(RESEND_SECONDS);
      setDigits(Array(OTP_LENGTH).fill(''));
      inputs.current[0]?.focus();
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not resend OTP');
    }
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');

  return (
    <>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-container-low mb-6">
          <span className="material-symbols-outlined text-primary text-3xl">lock_open</span>
        </div>
        <h1
          className="font-headline font-bold text-3xl tracking-tight text-on-surface mb-2"
          style={{ letterSpacing: '-0.02em' }}
        >
          Verify Identity
        </h1>
        <p className="font-body text-base text-on-surface-variant leading-relaxed">
          We&apos;ve sent a 6-digit secure code to
          <br />
          <span className="font-semibold text-on-surface">{email || 'your email'}</span>
        </p>
      </div>

      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex justify-between gap-1.5 sm:gap-2 w-full" onPaste={handlePaste}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              aria-label={`Digit ${i + 1}`}
              className="flex-1 min-w-0 aspect-[3/4] max-h-14 text-center font-headline text-xl sm:text-2xl font-bold bg-surface-container-low text-on-surface rounded-lg border-0 p-0 focus:ring-0 focus:outline-none focus:shadow-[inset_0_0_0_2px_rgba(0,107,44,0.4)] transition-all duration-200"
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => setDigitAt(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-secondary">
            <span className="material-symbols-outlined text-[18px]">timer</span>
            <span className="font-body font-medium">
              {mm}:{ss}
            </span>
          </div>
          <button
            type="button"
            onClick={handleResend}
            disabled={secondsLeft > 0}
            className="font-body font-semibold text-primary hover:text-primary-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Resend Code
          </button>
        </div>

        {error && <p className="text-sm text-error -mt-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold text-lg rounded-xl shadow-lg shadow-primary-container/20 hover:shadow-primary-container/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:scale-100"
        >
          {loading ? 'Verifying...' : 'Verify Access'}
          {!loading && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link
          to="/login"
          className="font-body text-sm font-medium text-secondary hover:text-on-surface transition-colors"
        >
          Return to Login
        </Link>
      </div>
    </>
  );
}
