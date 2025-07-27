import { setQueryToURL, clearQueryFromURL } from '../utils/url';
import { fetchTopCharts, fetchSearchTracks } from './apiService';
import { type Track } from '../types';

export async function handleSearch(
  query: string,
  saveSearch: (query: string, tracks: Track[]) => void
) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return handleClearSearch(saveSearch);
  }

  setQueryToURL(trimmedQuery);
  const tracks = await fetchSearchTracks(trimmedQuery);
  saveSearch(trimmedQuery, tracks);
  return tracks;
}

export async function handleClearSearch(
  saveSearch: (query: string, tracks: Track[]) => void
) {
  clearQueryFromURL();

  const tracks = await fetchTopCharts();
  saveSearch('', tracks);

  return tracks;
}
