import { useState } from 'react';
import { authService } from '../../services/authService.js';
import { useAuth } from '../../hooks/useAuth.js';
import { isValid10DigitPhone } from '../../utils/validators.js';

const stripCountryPrefix = (phone) => String(phone || '').replace(/^\+?91/, '').replace(/\D/g, '');

export default function ProfileCompletionModal({ open, onClose, onComplete }) {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(stripCountryPrefix(user?.phone));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) return setError('Name is required');
    if (!isValid10DigitPhone(phone)) return setError('Enter a valid 10-digit phone number');
    if (!user?.email) return setError('You need to be logged in.');

    const fullPhone = `+91${phone.trim()}`;

    try {
      setLoading(true);
      const res = await authService.completeProfile({
        email: user.email,
        name: name.trim(),
        phone: fullPhone,
      });
      if (res?.user) {
        updateUser(res.user);
      } else {
        updateUser({ ...user, name: name.trim(), phone: fullPhone, profileCompleted: true });
      }
      if (onComplete) onComplete();
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save profile. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface-container-lowest rounded-[1.5rem] shadow-ambient p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-container/20 text-primary mb-4">
            <span className="material-symbols-outlined">person</span>
          </div>
          <h2 className="font-headline text-2xl font-bold text-on-surface mb-1">
            Complete Your Profile
          </h2>
          <p className="font-body text-sm text-on-surface-variant">
            We need your name and phone number to confirm bookings.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label
              htmlFor="profile-name"
              className="block font-label font-bold text-xs uppercase tracking-widest text-on-surface-variant mb-2"
            >
              Full Name
            </label>
            <input
              id="profile-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Priyanshu De"
              className="block w-full px-4 py-3 bg-surface-container-low rounded-xl border border-transparent focus:border-primary/40 text-on-surface font-body outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="profile-phone"
              className="block font-label font-bold text-xs uppercase tracking-widest text-on-surface-variant mb-2"
            >
              Phone Number
            </label>
            <div className="flex items-stretch bg-surface-container-low rounded-xl border border-transparent focus-within:border-primary/40 transition-colors overflow-hidden">
              <span className="flex items-center px-4 font-body text-on-surface-variant bg-surface-container select-none">
                +91
              </span>
              <input
                id="profile-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="9876543210"
                className="flex-1 min-w-0 px-4 py-3 bg-transparent border-0 focus:ring-0 text-on-surface font-body outline-none"
              />
            </div>
          </div>

          {error && <p className="text-sm text-error">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 bg-surface-container-high text-on-surface font-headline font-semibold rounded-xl hover:bg-surface-variant transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 h-12 bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold rounded-xl disabled:opacity-60"
            >
              {loading ? 'Saving…' : 'Save & Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
