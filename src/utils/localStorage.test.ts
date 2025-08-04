import { describe, it, expect, vi, beforeEach } from 'vitest';
import { saveSearchState, getSavedSearchState } from './localStorage';
import { type Track } from '../types';
import { mockApiTrack } from '../__tests__/mock/mockApiData';
const LS_KEY = 'searchData';

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    getItem: vi.fn((key: string) => store[key]),
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
  vi.clearAllMocks();
});

describe('saveSearchState and getSavedSearchState', () => {
  const testTrack: Track = mockApiTrack;

  it('should save the full search state to localStorage', () => {
    saveSearchState('query', [testTrack], 2, 5, 100);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      LS_KEY,
      JSON.stringify({
        query: 'query',
        results: [testTrack],
        page: 2,
        totalPages: 5,
        totalResults: 100,
      })
    );
  });

  it('should return default state if nothing saved', () => {
    localStorageMock.getItem.mockRejectedValue(new Error('Item not found'));

    const result = getSavedSearchState();

    expect(result).toEqual({
      query: '',
      results: [],
      page: 1,
      totalPages: 1,
      totalResults: 0,
    });
  });

  it('should parse and return saved state', () => {
    const savedState = {
      query: 'saved',
      results: [testTrack],
      page: 3,
      totalPages: 4,
      totalResults: 20,
    };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedState));

    const result = getSavedSearchState();

    expect(result).toEqual(savedState);
  });

  it('should return default on invalid JSON', () => {
    localStorageMock.getItem.mockReturnValue('not-json');

    const result = getSavedSearchState();

    expect(result).toEqual({
      query: '',
      results: [],
      page: 1,
      totalPages: 1,
      totalResults: 0,
    });
  });
});
