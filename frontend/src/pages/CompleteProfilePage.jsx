import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';
import { authService } from '../services/authService.js';
import { useAuth } from '../hooks/useAuth.js';
import { isValidPhone } from '../utils/validators.js';

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
    if (!name.trim()) return setError('Name is required');
    if (!isValidPhone(phone)) return setError('Enter a valid phone number');
    try {
      setLoading(true);
      const res = await authService.completeProfile({ email, name, phone });
      login(res.token, res.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Complete your profile</h2>
      <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input
        label="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={error}
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Continue'}
      </Button>
    </form>
  );
}
