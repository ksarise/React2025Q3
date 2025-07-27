import { setQueryToURL, clearQueryFromURL } from '../utils/url';
import { saveSearch, clearSearch } from '../utils/localStorage';
import { fetchTopCharts, fetchSearchTracks } from './apiService';

export async function handleSearch(query: string) {
  if (!query.trim()) {
    return handleClearSearch();
  }

  setQueryToURL(query);
  const tracks = await fetchSearchTracks(query);
  saveSearch(query, tracks);
  return tracks;
}

export async function handleClearSearch() {
  clearQueryFromURL();
  clearSearch();
  return await fetchTopCharts();
}
