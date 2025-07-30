import { describe, it, expect, vi, beforeEach } from 'vitest';
import initializeAppState from './appInitializer';
import { getSearchParamsFromURL } from './url';
import { getSavedSearchState } from './localStorage';
import { mockApiTrack } from '../__tests__/mock/mockApiData';

vi.mock('./url');
vi.mock('./localStorage');

describe('initializeAppState', () => {
  const mockTrack = mockApiTrack;

  beforeEach(() => {
    vi.mocked(getSearchParamsFromURL).mockReturnValue({ query: '', page: 1 });
    vi.mocked(getSavedSearchState).mockReturnValue({
      page: 1,
      totalPages: 0,
      results: [],
      totalResults: 0,
      query: '',
    });
  });

  it('should return default state when no query ', () => {
    const result = initializeAppState();
    expect(result).toEqual({
      query: '',
      results: [],
      isLoading: false,
      error: null,
      isSearching: false,
      currentPage: 1,
      totalPages: 0,
      totalResults: 0,
      itemsPerPage: 10,
    });
  });

  it('should set isSearching to true when query exists in URL', () => {
    vi.mocked(getSearchParamsFromURL).mockReturnValue({
      query: 'test-query',
      page: 2,
    });
    vi.mocked(getSavedSearchState).mockReturnValue({
      page: 2,
      totalPages: 5,
      results: [mockTrack],
      totalResults: 1,
      query: '',
    });

    const result = initializeAppState();
    expect(result.query).toBe('test-query');
    expect(result.isSearching).toBe(true);
    expect(result.currentPage).toBe(2);
    expect(result.totalPages).toBe(5);
    expect(result.totalResults).toBe(1);
    expect(result.results).toEqual([]);
  });

  it('should use saved page if URL page is missing', () => {
    vi.mocked(getSearchParamsFromURL).mockReturnValue({
      query: '',
      page: 3,
    });
    vi.mocked(getSavedSearchState).mockReturnValue({
      page: 3,
      totalPages: 10,
      results: [],
      totalResults: 0,
      query: '',
    });

    const result = initializeAppState();
    expect(result.currentPage).toBe(3);
  });

  it('should return correct totalResults based on length', () => {
    vi.mocked(getSavedSearchState).mockReturnValue({
      page: 1,
      totalPages: 1,
      results: [mockTrack, mockTrack],
      totalResults: 2,
      query: '',
    });

    const result = initializeAppState();
    expect(result.totalResults).toBe(2);
  });

  it('should consider empty string query as not searching', () => {
    vi.mocked(getSearchParamsFromURL).mockReturnValue({ query: '', page: 1 });

    const result = initializeAppState();
    expect(result.isSearching).toBe(false);
  });
});
