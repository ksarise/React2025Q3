import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getSavedQuery,
  getSavedResults,
  saveSearch,
  clearSearch,
  LS_TERM_KEY,
  LS_RESULTS_KEY,
} from './localStorage';
import { mockApiTrack } from '../__tests__/mock/mockApiData';
import { type Track } from '../types';

describe('localStorage utils', () => {
  const mockTrack: Track = mockApiTrack;

  const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value.toString();
      }),
      removeItem: vi.fn((key: string) => {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete store[key];
      }),
      clear: vi.fn(() => {
        store = {};
      }),
    };
  })();

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getSavedQuery', () => {
    it('should return empty string when no term saved', () => {
      expect(getSavedQuery()).toBe('');
      expect(localStorage.getItem).toHaveBeenCalledWith(LS_TERM_KEY);
    });

    it('should return saved term', () => {
      const testQuery = 'test query';
      localStorage.setItem(LS_TERM_KEY, testQuery);
      expect(getSavedQuery()).toBe(testQuery);
    });
  });

  describe('getSavedResults', () => {
    it('should return empty array when no results saved', () => {
      expect(getSavedResults()).toEqual([]);
      expect(localStorage.getItem).toHaveBeenCalledWith(LS_RESULTS_KEY);
    });

    it('should return parsed results when they exist', () => {
      const testResults = [mockTrack];
      localStorage.setItem(LS_RESULTS_KEY, JSON.stringify(testResults));
      expect(getSavedResults()).toEqual(testResults);
    });
  });

  describe('saveSearch', () => {
    it('should save query and results to ls', () => {
      const testQuery = 'test query';
      const testResults = [mockTrack];

      saveSearch(testQuery, testResults);

      expect(localStorage.setItem).toHaveBeenCalledWith(LS_TERM_KEY, testQuery);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        LS_RESULTS_KEY,
        JSON.stringify(testResults)
      );
    });

    it('should handle empty query and results', () => {
      saveSearch('', []);

      expect(localStorage.setItem).toHaveBeenCalledWith(LS_TERM_KEY, '');
      expect(localStorage.setItem).toHaveBeenCalledWith(LS_RESULTS_KEY, '[]');
    });
  });

  describe('clearSearch', () => {
    it('should clear', () => {
      localStorage.setItem(LS_TERM_KEY, 'test');
      localStorage.setItem(LS_RESULTS_KEY, '[]');
      clearSearch();
      expect(localStorage.removeItem).toHaveBeenCalledWith(LS_TERM_KEY);
      expect(localStorage.removeItem).toHaveBeenCalledWith(LS_RESULTS_KEY);
    });
  });
});
