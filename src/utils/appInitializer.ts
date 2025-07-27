import { type AppState } from '../types';
import { getSearchParamsFromURL } from './url';
import { getSavedSearchState } from './localStorage';

export default function initializeAppState(): AppState {
  const saved = getSavedSearchState();
  const urlQuery = getSearchParamsFromURL().query ?? '';
  const urlPage = getSearchParamsFromURL().page ?? saved.page;

  const isSearching = urlQuery !== '';

  return {
    query: urlQuery,
    results: [],
    isLoading: false,
    error: null,
    isSearching,
    currentPage: urlPage,
    totalPages: saved.totalPages,
    totalResults: saved.results.length,
    itemsPerPage: 10,
  };
}
