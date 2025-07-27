import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import { type AppState } from './types';
import initializeAppState from './utils/appInitializer';
import { handleSearch, handleClearSearch } from './services/dataService';

const App = () => {
  const [appState, setAppState] = useState<AppState>(initializeAppState());
  const { isLoading, results, isSearching, query, error } = appState;

  const setTopCharts = useCallback(async () => {
    try {
      setAppState((prev) => ({ ...prev, isLoading: true, isSearching: false }));
      const tracks = await handleClearSearch();
      setAppState((prev) => ({
        ...prev,
        results: tracks,
        isLoading: false,
        query: '',
      }));
    } catch (error) {
      setAppState((prev) => ({
        ...prev,
        isLoading: false,
        error: (error as Error).message,
      }));
    }
  }, []);

  const setSearchTracks = useCallback(async (searchQuery: string) => {
    try {
      setAppState((prev) => ({ ...prev, isLoading: true }));
      const tracks = await handleSearch(searchQuery);
      setAppState((prev) => ({
        ...prev,
        results: tracks,
        isLoading: false,
        isSearching: true,
        query: searchQuery,
      }));
    } catch (error) {
      setAppState((prev) => ({
        ...prev,
        isLoading: false,
        error: (error as Error).message,
      }));
    }
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      if (query && results.length === 0) {
        await setSearchTracks(query);
      } else if (!query) {
        await setTopCharts();
      }
    };

    loadInitialData();
  }, []);

  const updateQuery = useCallback(
    ({ query }: { query: string }) => {
      const trimmedQuery = query.trim();

      if (!trimmedQuery) {
        setTopCharts();
      } else {
        setSearchTracks(trimmedQuery);
      }
    },
    [setTopCharts, setSearchTracks]
  );

  if (error) {
    throw new Error('Application Error: Something went wrong');
  }

  return (
    <div className="min-h-[90vh] bg-gray-900 text-white min-w-[800px]">
      <Header onQuery={updateQuery} initialQuery={query} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <MainContent
            isLoading={isLoading}
            results={results}
            isSearching={isSearching}
            query={query}
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
