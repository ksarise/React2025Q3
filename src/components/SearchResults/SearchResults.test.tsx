import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';
import { type SearchResultsProps } from '../../types.ts';
vi.mock('./SearchItem/SearchItem.tsx', () => ({
  default: ({ track }: { track: unknown }) => (
    <div data-testid="search-item">{JSON.stringify(track)}</div>
  ),
}));

describe('SearchResults Component', () => {
  const defaultProps: SearchResultsProps = {
    tracks: [
      {
        name: 'Test Track 1',
        duration: '245',
        playcount: '1000',
        listeners: '5000',
        mbid: '12345',
        url: 'http://test.track/1',
        streamable: { '#text': '1', fulltrack: '0' },
        artist: {
          name: 'Test Artist 1',
          mbid: 'artist-123',
          url: 'http://test.artist/1',
        },
        image: [],
        id: 1,
      },
      {
        name: 'Test Track 2',
        duration: '187',
        playcount: '2000',
        listeners: '8000',
        mbid: '67890',
        url: 'http://test.track/2',
        streamable: { '#text': '1', fulltrack: '0' },
        artist: {
          name: 'Test Artist 2',
          mbid: 'artist-456',
          url: 'http://test.artist/2',
        },
        image: [],
        id: 2,
      },
    ],
    isSearching: false,
    searchQuery: '',
  };

  it('should renders correctly with default props', () => {
    render(<SearchResults {...defaultProps} />);
    expect(screen.getByText('Top Chart Tracks')).toBeInTheDocument();
    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('TRACK')).toBeInTheDocument();
    expect(screen.getByText('ARTIST')).toBeInTheDocument();
    expect(screen.getByText('LISTENERS')).toBeInTheDocument();
    const items = screen.getAllByTestId('search-item');
    expect(items).toHaveLength(2);
  });

  it('should passes correct track data to SearchItem components', () => {
    render(<SearchResults {...defaultProps} />);

    const items = screen.getAllByTestId('search-item');
    expect(items[0]).toHaveTextContent(JSON.stringify(defaultProps.tracks[0]));
    expect(items[1]).toHaveTextContent(JSON.stringify(defaultProps.tracks[1]));
  });
  it('should renders correct number of tracks', () => {
    const { rerender } = render(<SearchResults {...defaultProps} />);
    expect(screen.getAllByTestId('search-item')).toHaveLength(2);

    const singleTrackProps: SearchResultsProps = {
      ...defaultProps,
      tracks: [defaultProps.tracks[0]],
    };

    rerender(<SearchResults {...singleTrackProps} />);
    expect(screen.getAllByTestId('search-item')).toHaveLength(1);

    const emptyTracksProps: SearchResultsProps = {
      ...defaultProps,
      tracks: [],
    };

    rerender(<SearchResults {...emptyTracksProps} />);
    expect(screen.queryAllByTestId('search-item')).toHaveLength(0);
  });
});
