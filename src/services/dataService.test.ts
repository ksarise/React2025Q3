import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Component } from 'react';
import { mockApiTrack } from '../__tests__/mock/mockApiData';
import { type AppState } from '../types';

vi.mock('./apiService', () => ({
  fetchTopCharts: vi.fn(() => Promise.resolve([mockApiTrack])),
  fetchSearchTracks: vi.fn(() => Promise.resolve([mockApiTrack])),
}));

vi.mock('../utils/url', () => ({
  setQueryToURL: vi.fn(),
}));

vi.mock('../utils/localStorage', () => ({
  saveSearch: vi.fn(),
}));

describe('dataService', () => {
  let apiService: typeof import('./apiService');
  let urlUtils: typeof import('../utils/url');
  let localStorageUtils: typeof import('../utils/localStorage');

  const mockApp = {
    setState: vi.fn(),
  } as unknown as Component<object, AppState>;

  beforeEach(async () => {
    apiService = await import('./apiService');
    urlUtils = await import('../utils/url');
    localStorageUtils = await import('../utils/localStorage');

    vi.clearAllMocks();
  });

  describe('loadTopCharts', () => {
    it('should load top charts and update state', async () => {
      await loadTopCharts(mockApp);

      expect(mockApp.setState).toHaveBeenCalledWith({
        isLoading: true,
        isSearching: false,
      });
      expect(apiService.fetchTopCharts).toHaveBeenCalled();
      expect(mockApp.setState).toHaveBeenCalledWith({
        results: [mockApiTrack],
      });
      expect(mockApp.setState).toHaveBeenCalledWith({ isLoading: false });
    });
  });

  describe('searchTracks', () => {
    it('should search tracks and update state', async () => {
      const query = 'test';

      await searchTracks(mockApp, query);

      expect(mockApp.setState).toHaveBeenCalledWith({
        isLoading: true,
        query,
        isSearching: true,
      });
      expect(urlUtils.setQueryToURL).toHaveBeenCalledWith(query);
      expect(apiService.fetchSearchTracks).toHaveBeenCalledWith(query);
      expect(localStorageUtils.saveSearch).toHaveBeenCalledWith(query, [
        mockApiTrack,
      ]);
      expect(mockApp.setState).toHaveBeenCalledWith({
        results: [mockApiTrack],
      });
      expect(mockApp.setState).toHaveBeenCalledWith({ isLoading: false });
    });
  });
});
