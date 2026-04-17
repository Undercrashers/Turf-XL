export const storage = {
  get: (key) => {
    const raw = localStorage.getItem(key);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return raw;
    }
  },
  set: (key, value) => {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  },
  remove: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
};
