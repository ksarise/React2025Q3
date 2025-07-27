import { fetchTopCharts, fetchSearchTracks } from './apiService';
import { type Track } from '../types';

export async function handleSearch(
  query: string,
  saveSearch: (
    query: string,
    tracks: Track[],
    page: number,
    totalPages: number,
    totalResults: number
  ) => void,
  page: number
) {
  const trimmed = query.trim();
  if (!trimmed) {
    return handleClearSearch(saveSearch, page);
  }
  const { tracks, pagination } = await fetchSearchTracks(trimmed, page);
  saveSearch(
    trimmed,
    tracks,
    pagination.currentPage,
    pagination.totalPages,
    pagination.totalResults
  );

  return { tracks, pagination };
}

export async function handleClearSearch(
  saveSearch: (
    query: string,
    tracks: Track[],
    page: number,
    totalPages: number,
    totalResults: number
  ) => void,
  page: number
) {
  const { tracks, pagination } = await fetchTopCharts(page);

  saveSearch(
    '',
    tracks,
    pagination.currentPage,
    pagination.totalPages,
    pagination.totalResults
  );
  return { tracks, pagination };
}
