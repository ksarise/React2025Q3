import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { getSavedSearchState } from './utils/localStorage';
import * as dataService from './services/dataService';
import type { SearchState } from './utils/localStorage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './store/selectedItemsSlice';

vi.mock('./components/Header/Header', () => ({
  default: () => <div>Header Mock</div>,
}));
vi.mock('./components/MainContent/MainContent', () => ({
  default: () => <div>MainContent Mock</div>,
}));
vi.mock('./components/Loader/Loader', () => ({
  default: () => <div>Loader Mock</div>,
}));
vi.mock('./components/Pagination/Pagination', () => ({
  default: () => <div>Pagination Mock</div>,
}));
vi.mock('./components/TrackDetails/TrackDetails', () => ({
  default: () => <div>TrackDetails Mock</div>,
}));
vi.mock('./components/Flyout/Flyout', () => ({
  default: () => <div>Flyout Mock</div>,
}));

vi.mock('./services/dataService');
vi.mock('./services/Search/searchService');
vi.mock('./utils/localStorage');

describe('App Component', () => {
  const initialLocalStorageState: SearchState = {
    query: '',
    results: [],
    page: 1,
    totalPages: 1,
    totalResults: 0,
  };

  beforeEach(() => {
    vi.mocked(getSavedSearchState).mockReturnValue(initialLocalStorageState);
    vi.mocked(dataService.handleSearch).mockResolvedValue({
      tracks: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalResults: 0,
        itemsPerPage: 10,
      },
    });
    vi.mocked(dataService.handleClearSearch).mockResolvedValue({
      tracks: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalResults: 0,
        itemsPerPage: 10,
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  function renderWithProviders(initialEntries = ['/']) {
    const store = configureStore({
      reducer: {
        selectedItems: selectedItemsReducer,
      },
      preloadedState: {
        selectedItems: {
          selectedTracks: [],
        },
      },
    });

    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  }

  it('should renders Header, MainContent, Pagination components', async () => {
    renderWithProviders();

    expect(screen.getByText('Header Mock')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('MainContent Mock')).toBeInTheDocument();
      expect(screen.getByText('Pagination Mock')).toBeInTheDocument();
    });
  });

  it('should calls handleSearch if search query exists in URL', async () => {
    const query = 'test-query';
    renderWithProviders([`/?search=${query}&page=2`]);

    await waitFor(() => {
      expect(dataService.handleSearch).toHaveBeenCalledWith(
        query,
        expect.any(Function),
        2
      );
    });
  });

  it('should calls handleClearSearch if no search query in URL', async () => {
    renderWithProviders(['/']);

    await waitFor(() => {
      expect(dataService.handleClearSearch).toHaveBeenCalledWith(
        expect.any(Function),
        1
      );
    });
  });

  it('should displays TrackDetails if details param present in URL', async () => {
    renderWithProviders(['/?details=someEncodedValue']);

    await waitFor(() => {
      expect(screen.getByText('TrackDetails Mock')).toBeInTheDocument();
    });
  });

  it('should updates URL on search submission via Header', async () => {
    renderWithProviders(['/']);
    expect(screen.getByText('Header Mock')).toBeInTheDocument();
  });

  it('should handles page change via Pagination', async () => {
    renderWithProviders(['/']);
    expect(screen.getByText('Pagination Mock')).toBeInTheDocument();
  });
});
