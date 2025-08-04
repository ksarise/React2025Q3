import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchTopCharts,
  fetchSearchTracks,
  fetchTrackInfo,
} from './apiService';

import { getCharts, searchSong, getTrackInfo } from '../api/api';
import { addIndices, extractPaginationData } from '../utils/utils';
import { type Track, type ApiResponse, type TrackSearchResult } from '../types';
import { mockApiTrack } from '../__tests__/mock/mockApiData';

vi.mock('../api/api');
vi.mock('../utils/utils');

const mockTrack: Track = mockApiTrack;
const mockTrackSearchResult: TrackSearchResult = {
  ...mockTrack,
  artist: mockTrack.artist.name,
  streamable: mockTrack.streamable['#text'],
};

describe('apiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchTopCharts', () => {
    it('should fetch and return chart tracks and pagination', async () => {
      const page = 2;
      const expectedTracks = [{ ...mockTrack, id: 1 }];
      const expectedPagination = {
        currentPage: 2,
        totalPages: 5,
        totalResults: 50,
        itemsPerPage: 10,
      };
      const mockApiResponse: ApiResponse = {
        tracks: {
          track: [mockTrack],
          '@attr': { page: '2', totalPages: '5', perPage: '10', total: '50' },
        },
      };

      vi.mocked(getCharts).mockResolvedValue(mockApiResponse);
      vi.mocked(addIndices).mockReturnValue(expectedTracks);
      vi.mocked(extractPaginationData).mockReturnValue(expectedPagination);

      const result = await fetchTopCharts(page);

      expect(getCharts).toHaveBeenCalledWith(page);
      expect(addIndices).toHaveBeenCalledWith(mockApiResponse);
      expect(extractPaginationData).toHaveBeenCalledWith(mockApiResponse);
      expect(result).toEqual({
        tracks: expectedTracks,
        pagination: expectedPagination,
      });
    });
  });

  describe('fetchSearchTracks', () => {
    it('should search and return search tracks and pagination', async () => {
      const page = 1;
      const query = 'test';

      const mockApiResponse: ApiResponse = {
        results: {
          'opensearch:totalResults': '1',
          'opensearch:itemsPerPage': '1',
          'opensearch:Query': {
            '@role': '',
            '#text': '',
            startPage: '1',
          },
          trackmatches: {
            track: [mockTrackSearchResult],
          },
        },
      };

      const expectedTracks = [{ ...mockTrack, id: 1 }];
      const expectedPagination = {
        currentPage: 1,
        totalPages: 3,
        totalResults: 30,
        itemsPerPage: 10,
      };

      vi.mocked(searchSong).mockResolvedValue(mockApiResponse);
      vi.mocked(addIndices).mockReturnValue(expectedTracks);
      vi.mocked(extractPaginationData).mockReturnValue(expectedPagination);

      const result = await fetchSearchTracks(query, page);

      expect(searchSong).toHaveBeenCalledWith(query, page);
      expect(addIndices).toHaveBeenCalledWith(mockApiResponse);
      expect(extractPaginationData).toHaveBeenCalledWith(mockApiResponse);
      expect(result).toEqual({
        tracks: expectedTracks,
        pagination: expectedPagination,
      });
    });
  });

  describe('fetchTrackInfo', () => {
    it('should fetch track info by artist and track name', async () => {
      const artist = 'Some Artist';
      const trackName = 'Some Track';
      const mockTrackInfo = { name: trackName, artist };

      vi.mocked(getTrackInfo).mockResolvedValue(mockTrackInfo);

      const result = await fetchTrackInfo(artist, trackName);

      expect(getTrackInfo).toHaveBeenCalledWith(artist, trackName);
      expect(result).toEqual(mockTrackInfo);
    });
  });
});
