import { useState, useEffect, useCallback } from 'react';

type StoredValue<T> = [T, (value: T) => void, () => void];

const useLocalStorage = <T>(key: string, initialValue: T): StoredValue<T> => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error read ls key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : initialValue);
    } catch (error) {
      console.error(`Error read ls"${key}":`, error);
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error write ls key "${key}":`, error);
    }
  }, [key, storedValue]);

  const setValue = useCallback((value: T) => {
    setStoredValue(value);
  }, []);

  const resetValue = useCallback(() => {
    setStoredValue(initialValue);
  }, [initialValue]);

  return [storedValue, setValue, resetValue];
};

export default useLocalStorage;
