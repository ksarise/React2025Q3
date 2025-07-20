import { type Track } from '../types';

export const LS_TERM_KEY = 'term';
export const LS_RESULTS_KEY = 'searchResults';

export function getSavedQuery(): string {
  return localStorage.getItem(LS_TERM_KEY) || '';
}

export function getSavedResults(): Track[] {
  const raw = localStorage.getItem(LS_RESULTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveSearch(query: string, results: Track[]) {
  localStorage.setItem(LS_TERM_KEY, query);
  localStorage.setItem(LS_RESULTS_KEY, JSON.stringify(results));
}

export function clearSearch() {
  localStorage.removeItem(LS_TERM_KEY);
  localStorage.removeItem(LS_RESULTS_KEY);
}
