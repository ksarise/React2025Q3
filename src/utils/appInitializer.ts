import { type AppState } from '../types';
import { getQueryFromURL } from './url';
import { getSavedQuery, getSavedResults } from './localStorage';

export default function initializeAppState(): AppState {
  const urlQuery = getQueryFromURL();
  const savedQuery = getSavedQuery();
  const savedResults = getSavedResults();

  const initialQuery = urlQuery || savedQuery;
  const isSearching = !!initialQuery;

  return {
    query: initialQuery,
    results: savedResults,
    isLoading: false,
    error: null,
    isSearching,
  };
}
