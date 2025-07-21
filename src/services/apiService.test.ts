import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchTopCharts, fetchSearchTracks } from './apiService';
import { getCharts, searchSong } from '../api/api';
import { addIndices } from '../utils/utils';
import { type Track } from '../types';
import { mockApiTrack } from '../__tests__/mock/mockApiData';

vi.mock('../api/api');
vi.mock('../utils/utils');

const mockTrack: Track = mockApiTrack;

describe('apiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchTopCharts', () => {
    it('should fetch and return tracks with indices', async () => {
      const mockData = { tracks: { track: [mockTrack] } };
      vi.mocked(getCharts).mockResolvedValue(mockData);
      vi.mocked(addIndices).mockReturnValue([{ ...mockTrack, id: 1 }]);

      const result = await fetchTopCharts();

      expect(getCharts).toHaveBeenCalled();
      expect(addIndices).toHaveBeenCalledWith(mockData);
      expect(result).toEqual([{ ...mockTrack, id: 1 }]);
    });
  });

  describe('fetchSearchTracks', () => {
    it('should search and return tracks with indices', async () => {
      const mockData = { results: { trackmatches: { track: [mockTrack] } } };
      const query = 'test';
      vi.mocked(searchSong).mockResolvedValue(mockData);
      vi.mocked(addIndices).mockReturnValue([{ ...mockTrack, id: 1 }]);

      const result = await fetchSearchTracks(query);

      expect(searchSong).toHaveBeenCalledWith(query);
      expect(addIndices).toHaveBeenCalledWith(mockData);
      expect(result).toEqual([{ ...mockTrack, id: 1 }]);
    });
  });
});
