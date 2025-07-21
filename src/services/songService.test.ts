import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchTopCharts, fetchTracks } from './songService';
import { getCharts, searchSong } from '../api/api';
import { addIndices } from '../utils/utils';
import { type Track } from '../types';
import { mockApiTrack } from '../__tests__/mock/mockApiData';

vi.mock('../api/api');
vi.mock('../utils/utils');

const mockTrack: Track = mockApiTrack;

describe('songService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchTopCharts', () => {
    it('should fetch top charts', async () => {
      const mockData = { tracks: { track: [mockTrack] } };
      vi.mocked(getCharts).mockResolvedValue(mockData);
      vi.mocked(addIndices).mockReturnValue([mockTrack]);

      const result = await fetchTopCharts();
      expect(result).toEqual([mockTrack]);
    });
  });

  describe('fetchTracks', () => {
    it('should search tracks', async () => {
      const mockData = { results: { trackmatches: { track: [mockTrack] } } };
      vi.mocked(searchSong).mockResolvedValue(mockData);
      vi.mocked(addIndices).mockReturnValue([mockTrack]);

      const result = await fetchTracks('query');
      expect(result).toEqual([mockTrack]);
    });
  });
});
