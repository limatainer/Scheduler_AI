import { useState, useEffect, useCallback } from 'react';

// Hook for localStorage
export const useLocalStorage = (key, initialValue) => {
  // Function to get the stored value
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  // State to store our value
  const [storedValue, setStoredValue] = useState(readValue);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value) => {
      if (typeof window === 'undefined') {
        console.warn(
          `Tried setting localStorage key "${key}" even though environment is not a browser`
        );
        return;
      }

      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Save state
        setStoredValue(valueToStore);

        // Save to localStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));

        // Dispatch a custom event so other instances can update
        window.dispatchEvent(new Event('local-storage'));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Listen for changes to this localStorage key from other components
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };

    // Listen for the custom event, then call handleStorageChange
    window.addEventListener('local-storage', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('local-storage', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [readValue]);

  // Remove item from localStorage
  const removeItem = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [initialValue, key]);

  return [storedValue, setValue, removeItem];
};

// Helper function to set a cookie
export const setCookie = (name, value, days = 7, path = '/') => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=${path}; SameSite=Strict; Secure`;
};

// Helper function to get a cookie
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(';').shift());
  }
  return null;
};

// Helper function to remove a cookie
export const removeCookie = (name, path = '/') => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; SameSite=Strict; Secure`;
};

// Hook for cookies
export const useCookie = (key, initialValue) => {
  const [item, setItem] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    const cookie = getCookie(key);
    return cookie !== null ? JSON.parse(cookie) : initialValue;
  });

  const updateItem = useCallback(
    (value, options) => {
      const valueToStore = value instanceof Function ? value(item) : value;
      setItem(valueToStore);
      setCookie(
        key,
        JSON.stringify(valueToStore),
        options?.days,
        options?.path
      );
    },
    [key, item]
  );

  const removeItem = useCallback(() => {
    setItem(undefined);
    removeCookie(key);
  }, [key]);

  return [item, updateItem, removeItem];
};
