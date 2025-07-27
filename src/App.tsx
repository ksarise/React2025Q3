import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import Pagination from './components/Pagination/Pagination';
import Loader from './components/Loader/Loader';
import type { AppState, Track } from './types';
import { getSavedSearchState } from './utils/localStorage';
import useLocalStorage from './hooks/useLocalStorage';
import { handleSearch, handleClearSearch } from './services/dataService';
import TrackDetails from './components/TrackDetails/TrackDetails';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const urlSearchParams = new URLSearchParams(location.search);
  const queryFromUrl = urlSearchParams.get('search') ?? '';
  const pageFromUrl = parseInt(urlSearchParams.get('page') ?? '1', 10);
  const detailEncodedFromUrl = urlSearchParams.get('details');
  const initialLocalStorageState = useMemo(() => getSavedSearchState(), []);
  const [, setSavedSearchToLocalStorage] = useLocalStorage(
    'searchData',
    initialLocalStorageState
  );

  const [appState, setAppState] = useState<AppState>({
    isLoading: false,
    results: initialLocalStorageState.results,
    isSearching: initialLocalStorageState.query !== '',
    query: initialLocalStorageState.query,
    error: null,
    currentPage: pageFromUrl,
    totalPages: initialLocalStorageState.totalPages,
    totalResults: initialLocalStorageState.totalResults,
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

  const saveSearchResults = useCallback(
    (
      searchQuery: string,
      tracks: Track[],
      pageNumber: number,
      pageCount: number,
      totalCount: number
    ) => {
      setSavedSearchToLocalStorage({
        query: searchQuery,
        results: tracks,
        page: pageNumber,
        totalPages: pageCount,
        totalResults: totalCount,
      });

      setAppState((previousState) => ({
        ...previousState,
        currentPage: pageNumber,
        totalPages: pageCount,
        totalResults: totalCount,
      }));
    },
    [setSavedSearchToLocalStorage]
  );

  useEffect(() => {
    (async () => {
      setAppState((previousState) => ({
        ...previousState,
        isLoading: true,
        isSearching: previousState.query !== '',
        error: null,
      }));

      if (queryFromUrl) {
        const { tracks } = await handleSearch(
          queryFromUrl,
          saveSearchResults,
          pageFromUrl
        );
        setAppState((previousState) => ({
          ...previousState,
          results: tracks,
          query: queryFromUrl,
          isLoading: false,
        }));
      } else {
        const { tracks } = await handleClearSearch(
          saveSearchResults,
          pageFromUrl
        );
        setAppState((previousState) => ({
          ...previousState,
          results: tracks,
          query: '',
          isLoading: false,
        }));
      }
    })();
  }, [queryFromUrl, pageFromUrl]);

  const onSearch = useCallback(
    ({ query: newQuery }: { query: string }) => {
      const trimmedQuery = newQuery.trim();
      const searchParams = new URLSearchParams();

      if (trimmedQuery) {
        searchParams.set('search', trimmedQuery);
      }

      searchParams.set('page', '1');
      navigate({ pathname: '/', search: searchParams.toString() });
    },
    [navigate]
  );

  const onPageChange = useCallback(
    (nextPage: number) => {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('page', nextPage.toString());
      navigate({ pathname: '/', search: searchParams.toString() });
    },
    [navigate, location.search]
  );

  const onPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const onNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  const onSelectTrack = useCallback(
    (track: Track) => {
      const encodedTrackId = encodeURIComponent(
        `${track.artist.name}___${track.name}`
      );
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('details', encodedTrackId);
      navigate({ pathname: '/', search: searchParams.toString() });
    },
    [navigate, location.search]
  );

  return (
    <div className="flex min-h-[90vh] bg-gray-900 text-white">
      <div className={detailEncodedFromUrl ? 'w-2/3 p-4' : 'w-full p-4'}>
        <Header onQuery={onSearch} initialQuery={query} />
        {isLoading ? (
          <Loader />
        ) : (
          <MainContent
            isLoading={isLoading}
            results={results}
            isSearching={isSearching}
            query={query}
            error={error}
            onItemClick={onSelectTrack}
          />
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={onPreviousPage}
          onNext={onNextPage}
        />
      </div>
      {detailEncodedFromUrl && (
        <div className="w-1/3 border-l border-gray-800 p-4">
          <TrackDetails />
        </div>
      )}
    </div>
  );
};

export default App;
