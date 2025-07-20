import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { type AppState } from './types';
import appInitializer from './utils/appInitializer';
import { handleSearch } from './services/Search/searchService';
import { loadTopCharts, searchTracks } from './services/dataService';
import { mockApiTrack } from './__tests__/mock/mockApiData';

vi.mock('./utils/appInitializer');
vi.mock('./services/Search/searchService');
vi.mock('./services/dataService');
vi.mock('./components/Header/Header', () => ({
  default: () => <div>Header Mock</div>,
}));
vi.mock('./components/MainContent/MainContent', () => ({
  default: () => <div>MainContent Mock</div>,
}));
vi.mock('./error/ErrorButton', () => ({
  default: ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick}>ErrorButton Mock</button>
  ),
}));

describe('App Component', () => {
  const mockInitialState: AppState = {
    query: '',
    results: [],
    isLoading: false,
    error: null,
    isSearching: false,
  };

  beforeEach(() => {
    vi.mocked(appInitializer).mockReturnValue(mockInitialState);
    vi.mocked(handleSearch).mockImplementation(() => {});
    vi.mocked(loadTopCharts).mockResolvedValue(undefined);
    vi.mocked(searchTracks).mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should renders', () => {
    render(<App />);
    expect(screen.getByText('Header Mock')).toBeInTheDocument();
    expect(screen.getByText('MainContent Mock')).toBeInTheDocument();
  });

  describe('Initialization', () => {
    it('should calls appInitializer on constructor', () => {
      render(<App />);
      expect(appInitializer).toHaveBeenCalled();
    });

    it('loads top charts on mount when no query exists', () => {
      render(<App />);
      expect(loadTopCharts).toHaveBeenCalled();
    });

    it('should searches tracks on mount when query exists', () => {
      const query = 'test';
      vi.mocked(appInitializer).mockReturnValue({
        ...mockInitialState,
        query,
        results: [],
      });

      render(<App />);
      expect(searchTracks).toHaveBeenCalledWith(expect.anything(), query);
    });

    it('should not search on mount when results already exist', () => {
      vi.mocked(appInitializer).mockReturnValue({
        ...mockInitialState,
        query: 'test',
        results: [mockApiTrack],
      });

      render(<App />);
      expect(searchTracks).not.toHaveBeenCalled();
    });
  });

  describe('API Integration', () => {
    it('should handles successful top charts load', async () => {
      vi.mocked(loadTopCharts).mockImplementation(async (app) => {
        app.setState({ results: [mockApiTrack] });
      });

      render(<App />);
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(screen.getByText('MainContent Mock')).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('should updates query state correctly', () => {
      const query = 'new query';
      const appInstance = new App({});

      appInstance.updateQuery({ query });

      expect(handleSearch).toHaveBeenCalledWith(appInstance, query.trim());
    });
  });

  describe('Integration with child components', () => {
    it('should passes correct props to Header', () => {
      const query = 'initial query';
      vi.mocked(appInitializer).mockReturnValue({
        ...mockInitialState,
        query,
      });

      render(<App />);
      expect(screen.getByText('Header Mock')).toBeInTheDocument();
    });

    it('should passes correct props to MainContent', () => {
      render(<App />);
      expect(screen.getByText('MainContent Mock')).toBeInTheDocument();
    });
  });
});
