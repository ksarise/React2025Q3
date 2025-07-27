import { type Track } from '../types';

const LS_KEY = 'searchData';

export interface SearchState {
  query: string;
  results: Track[];
  page: number;
  totalPages: number;
  totalResults: number;
}

export function saveSearchState(
  query: string,
  results: Track[],
  page: number,
  totalPages: number,
  totalResults: number
) {
  const data: SearchState = { query, results, page, totalPages, totalResults };
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export function getSavedSearchState(): SearchState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) throw new Error();
    return JSON.parse(raw) as SearchState;
  } catch {
    return {
      query: '',
      results: [],
      page: 1,
      totalPages: 1,
      totalResults: 0,
    };
  }
}
