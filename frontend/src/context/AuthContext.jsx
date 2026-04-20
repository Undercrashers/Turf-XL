import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../constants/storageKeys.js';

export const AuthContext = createContext(null);

const readStoredToken = () => {
  const t = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (!t || t === 'undefined' || t === 'null') {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    return null;
  }
  return t;
};

const readStoredUser = () => {
  const raw = localStorage.getItem(STORAGE_KEYS.USER);
  if (!raw || raw === 'undefined' || raw === 'null') {
    localStorage.removeItem(STORAGE_KEYS.USER);
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(STORAGE_KEYS.USER);
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(readStoredToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(readStoredUser());
    setLoading(false);
  }, []);

  const login = useCallback((nextToken, nextUser) => {
    if (!nextToken || !nextUser) {
      console.error('AuthContext.login called with invalid payload', { nextToken, nextUser });
      return;
    }
    localStorage.setItem(STORAGE_KEYS.TOKEN, nextToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
  }, []);

  const updateUser = useCallback((nextUser) => {
    if (!nextUser) return;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(nextUser));
    setUser(nextUser);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      login,
      logout,
      setUser,
      updateUser,
    }),
    [user, token, loading, login, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
