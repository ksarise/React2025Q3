import { type AppState } from '../types';
import { getQueryFromURL } from './url';

export default function initializeAppState(): AppState {
  const urlQuery = getQueryFromURL();
  const isSearching = !!urlQuery;

  return {
    query: urlQuery || '',
    results: [],
    isLoading: false,
    error: null,
    isSearching,
  };
}
export const DEFAULT_SEARCH_STATE = {
  query: '',
  results: [],
};
