import { describe, it, expect } from 'vitest';
import { addIndices, extractPaginationData } from './utils';
import type { ApiResponse, TrackSearchResult } from '../types';
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
          artist: mockData.tracks?.track[0].artist,
          streamable: mockData.tracks?.track[0].streamable,
        },
        {
          ...mockData.tracks?.track[1],
          id: 2,
          artist: mockData.tracks?.track[1].artist,
          streamable: mockData.tracks?.track[1].streamable,
        },
      ]);
    });

    it('should return empty array if tracks are empty', () => {
      const mockData: ApiResponse = {
        tracks: {
          track: [],
          '@attr': { page: '1', totalPages: '1', perPage: '0', total: '0' },
        },
      };

      const result = addIndices(mockData);
      expect(result).toEqual([]);
    });
  });

  describe('search result data', () => {
    it('should transform and add indices to search results', () => {
      const mockData: ApiResponse = mockApiSongSearchData;

      const result = addIndices(mockData);

      expect(result).toEqual([
        {
          name: 'Bohemian Rhapsody',
          playcount: '0',
          listeners: '1000',
          mbid: '',
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

    it('should returns an empty array if search results are empty', () => {
      const mockData: ApiResponse = {
        results: {
          'opensearch:totalResults': '0',
          'opensearch:itemsPerPage': '0',
          'opensearch:Query': {
            '@role': '',
            '#text': '',
            startPage: '1',
          },
          trackmatches: {
            track: [],
            '@attr': { page: '1', pages: '1', perPage: '0', total: '0' },
          } as {
            track: TrackSearchResult[];
            '@attr': { [key: string]: string };
          },
        },
      };

      const result = addIndices(mockData);
      expect(result).toEqual([]);
    });
  });

  describe('fallback behavior', () => {
    it('should returns empty array for empty input', () => {
      const result = addIndices({} as ApiResponse);
      expect(result).toEqual([]);
    });

    it('should returns empty array for incomplete chart structure', () => {
      const result = addIndices({ tracks: {} } as ApiResponse);
      expect(result).toEqual([]);
    });

    it('should returns empty array for incomplete search structure', () => {
      const result = addIndices({ results: {} } as ApiResponse);
      expect(result).toEqual([]);
    });
    it('should processes tracks with string artist', () => {
      const input: ApiResponse = {
        tracks: {
          track: [
            {
              id: 1,
              name: 'Track 1',
              artist: {
                name: 'Artist 1',
                mbid: '',
                url: '',
              },
              streamable: { '#text': '0', fulltrack: '0' },
              playcount: '100',
              listeners: '50',
              mbid: 'mbid1',
              url: 'url1',
              image: [],
              duration: '180',
            },
          ],
          '@attr': { page: '1', totalPages: '5', total: '50', perPage: '10' },
        },
      };

      const result = addIndices(input);

      expect(result).toEqual([
        {
          id: 1,
          name: 'Track 1',
          artist: { name: 'Artist 1', mbid: '', url: '' },
          streamable: { '#text': '0', fulltrack: '0' },
          playcount: '100',
          listeners: '50',
          mbid: 'mbid1',
          url: 'url1',
          image: [],
          duration: '180',
        },
      ]);
    });

    it('should processes tracks with object artist and streamable', () => {
      const input: ApiResponse = {
        tracks: {
          track: [
            {
              id: 1,
              name: 'Track 2',
              artist: { name: 'Artist 2', mbid: 'mbid2', url: 'url2' },
              streamable: { '#text': '1', fulltrack: '1' },
              playcount: '200',
              listeners: '75',
              mbid: 'mbid2',
              url: 'url2',
              image: [],
              duration: '200',
            },
          ],
          '@attr': { page: '1', totalPages: '5', total: '50', perPage: '10' },
        },
      };

      const result = addIndices(input);

      expect(result).toEqual([
        {
          id: 1,
          name: 'Track 2',
          artist: { name: 'Artist 2', mbid: 'mbid2', url: 'url2' },
          streamable: { '#text': '1', fulltrack: '1' },
          playcount: '200',
          listeners: '75',
          mbid: 'mbid2',
          url: 'url2',
          image: [],
          duration: '200',
        },
      ]);
    });

    it('should processes search results with trackmatches', () => {
      const input: ApiResponse = {
        results: {
          'opensearch:totalResults': '100',
          'opensearch:itemsPerPage': '10',
          'opensearch:Query': {
            '@role': '',
            '#text': '',
            startPage: '1',
          },
          trackmatches: {
            track: [
              {
                name: 'Search Track',
                artist: 'Search Artist',
                listeners: '30',
                mbid: 'mbid3',
                url: 'url3',
                streamable: '0',
                image: [],
              },
            ],
          },
        },
      };

      const result = addIndices(input);

      expect(result).toEqual([
        {
          id: 1,
          name: 'Search Track',
          artist: { name: 'Search Artist', mbid: 'mbid3', url: '' },
          streamable: { '#text': '0', fulltrack: '0' },
          playcount: '0',
          listeners: '30',
          mbid: 'mbid3',
          url: 'url3',
          image: [],
          duration: '0',
        },
      ]);
    });

    it('should returns empty array for invalid or empty data', () => {
      const inputs: ApiResponse[] = [
        {},
        {
          tracks: {
            track: [],
            '@attr': {} as {
              page: string;
              totalPages: string;
              perPage: string;
              total: string;
            },
          },
        },
        {
          results: {
            'opensearch:totalResults': '0',
            'opensearch:itemsPerPage': '0',
            'opensearch:Query': {
              '@role': '',
              '#text': '',
              startPage: '1',
            },
            trackmatches: {
              track: [],
            },
          },
        },
        {
          tracks: {
            track: [],
            '@attr': {} as {
              page: string;
              totalPages: string;
              perPage: string;
              total: string;
            },
          },
        },
        {
          results: {
            'opensearch:totalResults': '0',
            'opensearch:itemsPerPage': '0',
            'opensearch:Query': {
              '@role': '',
              '#text': '',
              startPage: '1',
            },
            trackmatches: {
              track: [],
            },
          },
        },
      ];

      inputs.forEach((input) => {
        expect(addIndices(input)).toEqual([]);
      });
    });
  });
  describe('extractPaginationData utility function', () => {
    it('should extracts pagination data from tracks', () => {
      const input: ApiResponse = {
        tracks: {
          track: [],
          '@attr': {
            page: '2',
            totalPages: '10',
            total: '100',
            perPage: '10',
          },
        },
      };

      const result = extractPaginationData(input);

      expect(result).toEqual({
        currentPage: 2,
        totalPages: 10,
        totalResults: 100,
        itemsPerPage: 10,
      });
    });

    it('should extracts pagination data from results', () => {
      const input: ApiResponse = {
        results: {
          'opensearch:totalResults': '50',
          'opensearch:itemsPerPage': '5',
          'opensearch:Query': {
            '@role': '',
            '#text': '',
            startPage: '3',
          },
          trackmatches: { track: [] },
        },
      };

      const result = extractPaginationData(input);

      expect(result).toEqual({
        currentPage: 3,
        totalPages: 10,
        totalResults: 50,
        itemsPerPage: 5,
      });
    });

    it('should handles missing pagination fields in tracks', () => {
      const input: ApiResponse = {
        tracks: {
          track: [],
          '@attr': {
            page: '1',
            totalPages: '5',
            total: '50',
            perPage: '10',
          },
        },
      };

      const result = extractPaginationData(input);

      expect(result).toEqual({
        currentPage: 1,
        totalPages: 5,
        totalResults: 50,
        itemsPerPage: 10,
      });
    });

    it('should handles missing pagination fields in results', () => {
      const input: ApiResponse = {
        results: {
          'opensearch:totalResults': '0',
          'opensearch:itemsPerPage': '10',

          'opensearch:Query': {
            '@role': '',
            '#text': '',
            startPage: '1',
          },
          trackmatches: { track: [] },
        },
      };

      const result = extractPaginationData(input);

      expect(result).toEqual({
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        itemsPerPage: 10,
      });
    });
  });
});
