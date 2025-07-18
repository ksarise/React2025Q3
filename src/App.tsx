import React from 'react';
import './App.css';
import Header from './components/Header/Header.tsx';
import MainContent from './components/MainContent/MainContent.tsx';
import ErrorButton from './error/ErrorButton.tsx';

import { type AppState } from './types';
import {
  getSavedQuery,
  getSavedResults,
  saveSearch,
  clearSearch,
} from './utils/localStorage';
import { getQueryFromURL, setQueryToURL, clearQueryFromURL } from './utils/url';
import { fetchTopCharts, fetchTracks } from './services/songService';

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);

    this.state = {
      query: '',
      results: [],
      isLoading: false,
      error: null,
      isSearching: false,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.throwError = this.throwError.bind(this);
  }

  componentDidMount() {
    const urlQuery = getQueryFromURL();
    const savedQuery = getSavedQuery();
    const savedResults = getSavedResults();

    const initialQuery = urlQuery || savedQuery;
    const isSearching = !!initialQuery;

    this.setState(
      {
        query: initialQuery,
        results: savedResults,
        isSearching,
      },
      this.loadInitialData
    );
  }

  loadInitialData = () => {
    const { query, results } = this.state;

    if (query && results.length === 0) {
      this.searchTracks(query);
    } else if (!query) {
      this.loadTopCharts();
    }
  };

  async loadTopCharts() {
    this.setState({ isLoading: true, isSearching: false });

    try {
      const tracks = await fetchTopCharts();
      this.setState({ results: tracks });
    } catch (error) {
      console.error('Failed to load top charts:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async searchTracks(query: string) {
    this.setState({ isLoading: true, query, isSearching: true });

    setQueryToURL(query);

    try {
      const tracks = await fetchTracks(query);
      saveSearch(query, tracks);
      this.setState({ results: tracks });
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleSearch(query: string) {
    const trimmed = query.trim();
    if (trimmed) {
      this.searchTracks(trimmed);
    }
  }

  handleClearSearch() {
    clearQueryFromURL();
    clearSearch();
    this.loadTopCharts();
  }

  updateQuery({ query }: { query: string }) {
    const trimmed = query.trim();
    if (!trimmed) {
      this.handleClearSearch();
    } else {
      this.handleSearch(trimmed);
    }
  }

  throwError() {
    this.setState({ error: 'true' });
  }

  render() {
    const { isLoading, results, isSearching, query, error } = this.state;

    if (error) {
      throw new Error('OOOPS! Something went wrong');
    }

    return (
      <div className="min-h-[90vh] bg-gray-900 text-white min-w-[800px]">
        <Header onQuery={this.updateQuery} initialQuery={query} />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <MainContent
              isLoading={isLoading}
              results={results}
              isSearching={isSearching}
              query={query}
              error={error}
            />
            <div className="flex gap-2 justify-center items-center mt-8">
              <ErrorButton onClick={this.throwError} />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
