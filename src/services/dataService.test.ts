import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  handleSearch,
  handleClearSearch,
  handleTrackInfo,
} from './dataService';
import {
  fetchSearchTracks,
  fetchTopCharts,
  fetchTrackInfo,
} from './apiService';

vi.mock('./apiService', () => ({
  fetchSearchTracks: vi.fn(),
  fetchTopCharts: vi.fn(),
  fetchTrackInfo: vi.fn(),
}));

describe('dataService', () => {
  const mockSaveSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleSearch', () => {
    it('should calls handleClearSearch when query is empty after trim', async () => {
      const mockTracks = [
        { id: '1', name: 'Track 1', artist: { name: 'Artist 1' } },
      ];
      const mockPagination = {
        currentPage: 1,
        totalPages: 5,
        totalResults: 50,
      };
      (fetchTopCharts as ReturnType<typeof vi.fn>).mockResolvedValue({
        tracks: mockTracks,
        pagination: mockPagination,
      });

      const result = await handleSearch('  ', mockSaveSearch, 1);

      expect(fetchTopCharts).toHaveBeenCalledWith(1);
      expect(fetchSearchTracks).not.toHaveBeenCalled();
      expect(mockSaveSearch).toHaveBeenCalledWith('', mockTracks, 1, 5, 50);
      expect(result).toEqual({
        tracks: mockTracks,
        pagination: mockPagination,
      });
    });

    it('should calls fetchSearchTracks with trimmed query', async () => {
      const mockTracks = [
        { id: '2', name: 'Track 2', artist: { name: 'Artist 2' } },
      ];
      const mockPagination = {
        currentPage: 2,
        totalPages: 10,
        totalResults: 100,
      };
      (fetchSearchTracks as ReturnType<typeof vi.fn>).mockResolvedValue({
        tracks: mockTracks,
        pagination: mockPagination,
      });

      const result = await handleSearch(' test query ', mockSaveSearch, 2);

      expect(fetchSearchTracks).toHaveBeenCalledWith('test query', 2);
      expect(fetchTopCharts).not.toHaveBeenCalled();
      expect(mockSaveSearch).toHaveBeenCalledWith(
        'test query',
        mockTracks,
        2,
        10,
        100
      );
      expect(result).toEqual({
        tracks: mockTracks,
        pagination: mockPagination,
      });
    });
  });

  describe('handleClearSearch', () => {
    it('should calls fetchTopCharts and saveSearch with empty query', async () => {
      const mockTracks = [
        { id: '3', name: 'Track 3', artist: { name: 'Artist 3' } },
      ];
      const mockPagination = {
        currentPage: 1,
        totalPages: 3,
        totalResults: 30,
      };
      (fetchTopCharts as ReturnType<typeof vi.fn>).mockResolvedValue({
        tracks: mockTracks,
        pagination: mockPagination,
      });

      const result = await handleClearSearch(mockSaveSearch, 1);

      expect(fetchTopCharts).toHaveBeenCalledWith(1);
      expect(mockSaveSearch).toHaveBeenCalledWith('', mockTracks, 1, 3, 30);
      expect(result).toEqual({
        tracks: mockTracks,
        pagination: mockPagination,
      });
    });
  });

  describe('handleTrackInfo', () => {
    it('should calls fetchTrackInfo and returns formatted TrackDetails', async () => {
      const mockApiResponse = {
        name: 'Test Track',
        artist: { name: 'Test Artist' },
        album: { title: 'Test Album' },
        wiki: { published: '2023-01-01' },
        listeners: '1000',
        playcount: '2000',
        duration: '180',
      };
      (fetchTrackInfo as ReturnType<typeof vi.fn>).mockResolvedValue({
        track: mockApiResponse,
      });

      const result = await handleTrackInfo('Test Artist', 'Test Track');

      expect(fetchTrackInfo).toHaveBeenCalledWith('Test Artist', 'Test Track');
      expect(result).toEqual({
        name: undefined,
        artist: { name: 'Test Artist' },
        album: { title: 'Test Album' },
        wiki: { published: '2023-01-01' },
        listeners: '1000',
        playcount: '2000',
        duration: '180',
      });
    });

    it('should handles missing optional fields in TrackDetails', async () => {
      const mockApiResponse = {
        name: 'Test Track',
        artist: { name: 'Test Artist' },
        album: {},
        listeners: undefined,
        playcount: undefined,
        duration: undefined,
      };
      (fetchTrackInfo as ReturnType<typeof vi.fn>).mockResolvedValue({
        track: mockApiResponse,
      });

      const result = await handleTrackInfo('Test Artist', 'Test Track');

      expect(fetchTrackInfo).toHaveBeenCalledWith('Test Artist', 'Test Track');
      expect(result).toEqual({
        name: undefined,
        artist: { name: 'Test Artist' },
        album: { title: undefined },
        wiki: { published: undefined },
        listeners: undefined,
        playcount: undefined,
        duration: undefined,
      });
    });

    it('should throws error when fetchTrackInfo fails', async () => {
      (fetchTrackInfo as ReturnType<typeof vi.fn>).mockRejectedValue(
        new Error('API error')
      );

      await expect(
        handleTrackInfo('Test Artist', 'Test Track')
      ).rejects.toThrow('API error');
      expect(fetchTrackInfo).toHaveBeenCalledWith('Test Artist', 'Test Track');
    });
  });
});
