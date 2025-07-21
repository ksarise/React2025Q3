import { describe, it, expect } from 'vitest';
import { addIndices } from './utils';
import type { ApiResponse } from '../types';
import {
  mockApiData,
  mockApiSongSearchData,
} from '../__tests__/mock/mockApiData';

describe('addIndices utility function', () => {
  describe('when processing chart data', () => {
    it('should add indices to tracks from chart data', () => {
      const mockData: ApiResponse = mockApiData;

      const result = addIndices(mockData);

      expect(result).toEqual([
        {
          ...mockData.tracks?.track[0],
          id: 1,
        },
        {
          ...mockData.tracks?.track[1],
          id: 2,
        },
      ]);
    });

    it('should return empty array if tracks are empty', () => {
      const mockData: ApiResponse = {
        '@attr': { page: '1', pages: '1', perPage: '0', total: '0' },
        tracks: {
          track: [],
        },
      };

      const result = addIndices(mockData);
      expect(result).toEqual([]);
    });
  });

  describe('when processing search results', () => {
    it('should transform and add indices to search results', () => {
      const mockData: ApiResponse = mockApiSongSearchData;

      const result = addIndices(mockData);

      expect(result).toEqual([
        {
          name: 'Bohemian Rhapsody',
          playcount: '',
          listeners: '1000',
          mbid: 'f1',
          url: 'https://www.last.fm/music/Queen/_/Bohemian+Rhapsody',
          streamable: { '#text': '1', fulltrack: '0' },
          artist: {
            name: 'Queen',
            mbid: '',
            url: '',
          },
          image: [
            { '#text': 'image1-small', size: 'small' },
            { '#text': 'image1-large', size: 'large' },
          ],
          id: 1,
          duration: '0',
        },
      ]);
    });

    it('should return empty array if search results are empty', () => {
      const mockData: ApiResponse = {
        '@attr': { page: '1', pages: '1', perPage: '0', total: '0' },
        results: {
          trackmatches: {
            track: [],
          },
        },
      };

      const result = addIndices(mockData);
      expect(result).toEqual([]);
    });
  });

  describe('when processing invalid data', () => {
    it('should return empty array for empty input', () => {
      const mockData = {} as ApiResponse;
      const result = addIndices(mockData);
      expect(result).toEqual([]);
    });

    it('should return empty array for bad chart data', () => {
      const mockData = { tracks: {} } as ApiResponse;
      const result = addIndices(mockData);
      expect(result).toEqual([]);
    });

    it('should return empty array for bad search data', () => {
      const mockData = { results: {} } as ApiResponse;
      const result = addIndices(mockData);
      expect(result).toEqual([]);
    });
  });
});
