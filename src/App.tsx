import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import { type AppState, type Track } from './types';
import initializeAppState, {
  DEFAULT_SEARCH_STATE,
} from './utils/appInitializer';
import { handleSearch, handleClearSearch } from './services/dataService';
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {
  const [appState, setAppState] = useState<AppState>(initializeAppState());
  const { isLoading, results, isSearching, query, error } = appState;
  const [savedSearch, setSavedSearch] = useLocalStorage<{
    query: string;
    results: Track[];
  }>('searchData', DEFAULT_SEARCH_STATE);

  const saveSearchState = useCallback(
    (currentQuery: string, currentResults: Track[]) => {
      setSavedSearch({
        query: currentQuery,
        results: currentResults,
      });
    },
    [setSavedSearch]
  );

  useEffect(() => {
    const loadInitialData = async () => {
      if (
        savedSearch &&
        savedSearch.results.length > 0 &&
        savedSearch.query === query
      ) {
        setAppState((prev) => ({
          ...prev,
          results: savedSearch.results,
          isLoading: false,
          isSearching: !!savedSearch.query,
        }));
      } else if (query && results.length === 0) {
        await executeSearchTracks(query);
      } else {
        await executeLoadTopCharts();
      }
    };

    loadInitialData();
  }, []);

  const executeLoadTopCharts = useCallback(async () => {
    try {
      setAppState((prev) => ({ ...prev, isLoading: true, isSearching: false }));
      const tracks = await handleClearSearch(saveSearchState);

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
  }, [saveSearchState]);

  const executeSearchTracks = useCallback(
    async (searchQuery: string) => {
      try {
        setAppState((prev) => ({ ...prev, isLoading: true }));

        const tracks = await handleSearch(searchQuery, saveSearchState);

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
    },
    [saveSearchState]
  );

  const updateQuery = useCallback(
    ({ query }: { query: string }) => {
      const trimmedQuery = query.trim();
      const funcToCall = trimmedQuery
        ? executeSearchTracks
        : executeLoadTopCharts;
      funcToCall(trimmedQuery);
    },
    [executeLoadTopCharts, executeSearchTracks]
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
