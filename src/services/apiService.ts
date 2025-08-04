import { getCharts, searchSong, getTrackInfo } from '../api/api';
import { addIndices, extractPaginationData } from '../utils/utils';
import { type Track, type ApiResponse } from '../types';

interface ApiServiceResponse {
  tracks: Track[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalResults: number;
    itemsPerPage: number;
  };
}

export async function fetchTopCharts(
  page: number
): Promise<ApiServiceResponse> {
  const data: ApiResponse = await getCharts(page);
  const pagination = extractPaginationData(data);
  const fullList = addIndices(data);

  return {
    tracks: fullList,
    pagination,
  };
}

export async function fetchSearchTracks(
  query: string,
  page: number
): Promise<ApiServiceResponse> {
  const data: ApiResponse = await searchSong(query, page);

  return {
    tracks: addIndices(data),
    pagination: extractPaginationData(data),
  };
}
export async function fetchTrackInfo(artist: string, track: string) {
  return await getTrackInfo(artist, track);
}
