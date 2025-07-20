import { describe, it, expect, vi, beforeEach } from 'vitest';
import initializeAppState from './appInitializer';
import { type AppState } from '../types';
import { getQueryFromURL } from './url';
import { getSavedQuery, getSavedResults } from './localStorage';
import { mockApiTrack } from '../__tests__/mock/mockApiData';

vi.mock('./url');
vi.mock('./localStorage');

describe('initializeAppState', () => {
  const mockTrack = mockApiTrack;

  const defaultExpectedState: AppState = {
    query: '',
    results: [],
    isLoading: false,
    error: null,
    isSearching: false,
  };

  beforeEach(() => {
    vi.mocked(getQueryFromURL).mockReturnValue(null);
    vi.mocked(getSavedQuery).mockReturnValue('');
    vi.mocked(getSavedResults).mockReturnValue([]);
  });

  it('should return default state when no query in URL or localStorage', () => {
    const result = initializeAppState();
    expect(result).toEqual(defaultExpectedState);
  });

  it('should prioritize URL query over localStorage query', () => {
    const urlQuery = 'url-query';
    const savedQuery = 'saved-query';

    vi.mocked(getQueryFromURL).mockReturnValue(urlQuery);
    vi.mocked(getSavedQuery).mockReturnValue(savedQuery);
    vi.mocked(getSavedResults).mockReturnValue([mockTrack]);

    const result = initializeAppState();

    expect(result).toEqual({
      query: urlQuery,
      results: [mockTrack],
      isLoading: false,
      error: null,
      isSearching: true,
    });
  });

  it('should set isSearching to true when query exists', () => {
    vi.mocked(getSavedQuery).mockReturnValue('test-query');
    const result = initializeAppState();
    expect(result.isSearching).toBe(true);
  });

  it('should set isSearching to false when no query exists', () => {
    const result = initializeAppState();
    expect(result.isSearching).toBe(false);
  });

  it('should handle empty string as valid query', () => {
    vi.mocked(getQueryFromURL).mockReturnValue('');

    const result = initializeAppState();
    expect(result).toEqual({
      ...defaultExpectedState,
      query: '',
      isSearching: false,
    });
  });

  it('should return empty results when none are saved', () => {
    vi.mocked(getSavedQuery).mockReturnValue('test-query');
    const result = initializeAppState();
    expect(result.results).toEqual([]);
  });

  it('should return saved results when they exist', () => {
    const testResults = [mockTrack];
    vi.mocked(getSavedQuery).mockReturnValue('test-query');
    vi.mocked(getSavedResults).mockReturnValue(testResults);

    const result = initializeAppState();
    expect(result.results).toEqual(testResults);
  });
});
