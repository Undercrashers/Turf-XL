import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';
import { authService } from '../services/authService.js';
import { isValidEmail } from '../utils/validators.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Login / Sign up</h2>
      <p className="text-sm text-slate-500">
        Enter your email to receive a one-time password.
      </p>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        error={error}
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send OTP'}
      </Button>
    </form>
  );
}
