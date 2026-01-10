export const storage = {
  get: (key: string, defaultValue: string | null = null): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
  },

  set: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },

  remove: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  },

  getWithEnvironmentDefault: (key: string, prodDefault: string, devDefault: string): string => {
    const defaultValue = process.env.NODE_ENV === 'production' ? prodDefault : devDefault;
    return storage.get(key, defaultValue) || defaultValue;
  }
};

export const STORAGE_KEYS = {
  BACKGROUND: 'navada-background',
  CURRENT_IMAGE: 'navada-current-image',
} as const;