import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import Pagination from './components/Pagination/Pagination';
import type { AppState, Track } from './types';
import { getSavedSearchState } from './utils/localStorage';
import { getSearchParamsFromURL, setSearchParamsToURL } from './utils/url';
import useLocalStorage from './hooks/useLocalStorage';
import { handleSearch, handleClearSearch } from './services/dataService';

const App: React.FC = () => {
  const initialSearchData = useMemo(() => getSavedSearchState(), []);

  const [, setSavedSearch] = useLocalStorage<{
    query: string;
    page: number;
    totalPages: number;
    results: Track[];
  }>('searchData', initialSearchData);

  const [appState, setAppState] = useState<AppState>({
    isLoading: false,
    results: initialSearchData.results || [],
    isSearching: initialSearchData.query !== '',
    query: initialSearchData.query || '',
    error: null,
    currentPage: initialSearchData.page || 1,
    totalPages: initialSearchData.totalPages || 1,
    totalResults: initialSearchData.results?.length || 0,
    itemsPerPage: 10,
  });

  const {
    isLoading,
    results,
    isSearching,
    query,
    error,
    currentPage,
    totalPages,
  } = appState;

  const saveSearchState = useCallback(
    (
      q: string,
      tracks: Track[],
      page: number,
      totalPagesCount: number,
      totalResultsCount: number
    ) => {
      setSavedSearch({
        query: q,
        results: tracks,
        page,
        totalPages: totalPagesCount,
      });

      setAppState((prev) => ({
        ...prev,
        currentPage: page,
        totalPages: totalPagesCount,
        totalResults: totalResultsCount,
      }));
    },
    [setSavedSearch]
  );
  useEffect(() => {
    const { query, page } = getSearchParamsFromURL();
    (async () => {
      if (query) {
        await executeSearchTracks(query, page);
      } else {
        await executeLoadTopCharts(page);
      }
    })();
  }, []);

  const executeLoadTopCharts = useCallback(
    async (page: number) => {
      setAppState((prev) => ({
        ...prev,
        isLoading: true,
        isSearching: false,
        error: null,
      }));
      try {
        const { tracks, pagination } = await handleClearSearch(
          saveSearchState,
          page
        );
        saveSearchState(
          '',
          tracks,
          page,
          pagination.totalPages,
          pagination.totalResults
        );
        console.log('load top charts — page:', page, 'tracks:', tracks.length);
        setSearchParamsToURL('', page);
        setAppState((prev) => ({
          ...prev,
          results: tracks,
          query: '',
          isLoading: false,
        }));
      } catch (err) {
        setAppState((prev) => ({
          ...prev,
          isLoading: false,
          error: (err as Error).message,
        }));
      }
    },
    [saveSearchState]
  );

  const executeSearchTracks = useCallback(
    async (searchQuery: string, page: number = 1) => {
      setAppState((prev) => ({
        ...prev,
        isLoading: true,
        isSearching: true,
        error: null,
      }));
      try {
        const { tracks } = await handleSearch(
          searchQuery,
          saveSearchState,
          page
        );
        setSearchParamsToURL(searchQuery, page);
        setAppState((prev) => ({
          ...prev,
          results: tracks,
          query: searchQuery,
          isLoading: false,
        }));
      } catch (err) {
        setAppState((prev) => ({
          ...prev,
          isLoading: false,
          error: (err as Error).message,
        }));
      }
    },
    [saveSearchState]
  );

  const updateQuery = useCallback(
    ({ query: newQ }: { query: string }) => {
      const trimmed = newQ.trim();
      if (trimmed) {
        executeSearchTracks(trimmed, 1);
      } else {
        executeLoadTopCharts(1);
      }
    },
    [executeSearchTracks, executeLoadTopCharts]
  );

  const handlePrev = useCallback(() => {
    if (currentPage > 1) {
      if (query === '') {
        executeLoadTopCharts(currentPage - 1);
      } else {
        executeSearchTracks(query, currentPage - 1);
      }
    }
  }, [currentPage, query, executeSearchTracks, executeLoadTopCharts]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      if (query === '') {
        executeLoadTopCharts(currentPage + 1);
      } else {
        executeSearchTracks(query, currentPage + 1);
      }
    }
  }, [
    currentPage,
    totalPages,
    query,
    executeSearchTracks,
    executeLoadTopCharts,
  ]);

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
        {!isLoading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </main>
    </div>
  );
};

export default App;
