import { Component } from 'react';
import { type AppState } from '../types';
import { fetchTopCharts, fetchSearchTracks } from './apiService.ts';
import { setQueryToURL } from '../utils/url.ts';
import { saveSearch } from '../utils/localStorage';

export async function loadTopCharts(app: Component<object, AppState>) {
  app.setState({ isLoading: true, isSearching: false });

  try {
    const tracks = await fetchTopCharts();
    app.setState({ results: tracks });
  } catch (error) {
    console.error('Failed to load top charts:', error);
  } finally {
    app.setState({ isLoading: false });
  }
}

export async function searchTracks(
  app: Component<object, AppState>,
  query: string
) {
  app.setState({ isLoading: true, query, isSearching: true });
  setQueryToURL(query);

  try {
    const tracks = await fetchSearchTracks(query);
    saveSearch(query, tracks);
    app.setState({ results: tracks });
  } catch (error) {
    console.error('Search failed:', error);
  } finally {
    app.setState({ isLoading: false });
  }
}
