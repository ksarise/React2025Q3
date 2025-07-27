import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainContent from './MainContent';
import { type MainContentProps } from '../../types.ts';

vi.mock('../SearchResults/SearchResults.tsx', () => ({
  default: () => <div data-testid="search-results">Search Results</div>,
}));

vi.mock('../Loader/Loader.tsx', () => ({
  default: () => <div data-testid="loader">Loader</div>,
}));

describe('MainContent Component', () => {
  const defaultProps: MainContentProps = {
    isLoading: false,
    results: [],
    isSearching: false,
    query: '',
    error: null,
    onItemClick: () => {},
  };

  it('should renders SearchResults when all is ok', () => {
    const propsWithResults: MainContentProps = {
      ...defaultProps,
      results: [
        {
          name: 'Test Track',
          duration: '245',
          playcount: '1000',
          listeners: '5000',
          mbid: '12345',
          url: 'http://test.track',
          streamable: {
            '#text': '1',
            fulltrack: '0',
          },
          artist: {
            name: 'Test Artist',
            mbid: 'artist-123',
            url: 'http://test.artist',
          },
          image: [],
          id: 1,
        },
      ],
    };

    render(<MainContent {...propsWithResults} />);
    expect(screen.getByTestId('search-results')).toBeInTheDocument();
  });

  it('should renders Loader when isLoading is true', () => {
    const propsLoading: MainContentProps = {
      ...defaultProps,
      isLoading: true,
    };

    render(<MainContent {...propsLoading} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should renders error message when error exists', () => {
    const errorMessage = 'Test error message';
    const propsWithError: MainContentProps = {
      ...defaultProps,
      error: errorMessage,
    };

    render(<MainContent {...propsWithError} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass('text-red-500');
  });

  it('should renders "No Results Found" ', () => {
    const propsNoResults: MainContentProps = {
      ...defaultProps,
      results: [],
      isSearching: true,
      query: 'test query',
    };

    render(<MainContent {...propsNoResults} />);
    expect(screen.getByText('No Results Found')).toBeInTheDocument();
    expect(screen.getByText('No Results Found')).toHaveClass(
      'font-medium text-lg'
    );
  });
});
