import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as api from './api';

describe('api.ts', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('getCharts', () => {
    it('should fetch charts successfully', async () => {
      const mockResponse = { tracks: { track: [], '@attr': {} } };
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const data = await api.getCharts(1);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('method=chart.gettoptracks')
      );
      expect(data).toEqual(mockResponse);
    });

    it('should throw error if response is not ok', async () => {
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        statusText: 'Error fetching charts',
      });

      await expect(api.getCharts(1)).rejects.toThrow('Error fetching charts');
    });
  });

  describe('searchSong', () => {
    it('should fetch search results successfully', async () => {
      const mockResponse = { results: { trackmatches: { track: [] } } };
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const data = await api.searchSong('query', 1);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('method=track.search')
      );
      expect(data).toEqual(mockResponse);
    });

    it('should throw error if response is not ok', async () => {
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        statusText: 'Error searching song',
      });

      await expect(api.searchSong('query', 1)).rejects.toThrow(
        'Error searching song'
      );
    });
  });

  describe('getTrackInfo', () => {
    it('should fetch track info successfully', async () => {
      const mockResponse = { track: { name: 'Track' } };
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const data = await api.getTrackInfo('artist', 'track');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('method=track.getInfo')
      );
      expect(data).toEqual(mockResponse);
    });

    it('should throw error if response is not ok', async () => {
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        statusText: 'Error getting track info',
      });

      await expect(api.getTrackInfo('artist', 'track')).rejects.toThrow(
        'Error getting track info'
      );
    });
  });
});
