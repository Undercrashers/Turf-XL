import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';
import { authService } from '../services/authService.js';
import { useAuth } from '../hooks/useAuth.js';
import { isValidOtp } from '../utils/validators.js';

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const email = location.state?.email || '';

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidOtp(otp)) {
      setError('OTP must be 6 digits');
      return;
    }
    try {
      setLoading(true);
      const res = await authService.verifyOtp(email, otp);
      // Expect backend: { token, user, isNewUser }
      if (res?.isNewUser) {
        navigate('/complete-profile', { state: { email, tempToken: res.token } });
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Verify OTP</h2>
      <p className="text-sm text-slate-500">We sent a code to {email || 'your email'}.</p>
      <Input
        label="One-Time Password"
        inputMode="numeric"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        error={error}
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Verifying...' : 'Verify'}
      </Button>
    </form>
  );
}
