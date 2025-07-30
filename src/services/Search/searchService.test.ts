import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleSearch, handleClearSearch } from './searchService';
import { handleClearSearch as originalHandleClearSearch } from './clearSearchService';
import { type AppComponent } from '../../types';

vi.mock('./clearSearchService', () => ({
  handleClearSearch: vi.fn(),
}));

describe('searchService', () => {
  const mockApp = {
    searchTracks: vi.fn(),
  } as unknown as AppComponent;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleSearch', () => {
    it('should call clear search when query is empty', () => {
      const emptyQuery = '   ';
      handleSearch(mockApp, emptyQuery);

      expect(originalHandleClearSearch).toHaveBeenCalledWith(mockApp);
      expect(mockApp.searchTracks).not.toHaveBeenCalled();
    });

    it('should call searchTracks when query is not empty', () => {
      const query = 'test query';
      handleSearch(mockApp, query);

      expect(mockApp.searchTracks).toHaveBeenCalledWith(query.trim());
      expect(originalHandleClearSearch).not.toHaveBeenCalled();
    });
  });

  describe('handleClearSearch', () => {
    it('should call clearSearch', () => {
      handleClearSearch(mockApp);

      expect(originalHandleClearSearch).toHaveBeenCalledWith(mockApp);
    });
  });
});
