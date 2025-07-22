import SearchResults from './SearchResults.tsx';
import { type Track, type Artist } from '../../types.ts';

const mockTracks: Track[] = [
  {
    id: 1,
    name: 'Bohemian Rhapsody',
    duration: '5:55',
    playcount: '1200000000',
    listeners: '1.2B',
    mbid: '123e4567-e89b-12d3-a456-426614174000',
    url: 'https://www.last.fm/music/Queen/_/Bohemian+Rhapsody',
    streamable: { '#text': '1', fulltrack: '0' },
    artist: {
      name: 'Queen',
      mbid: '123e4567-e89b-12d3-a456-426614174001',
      url: 'https://www.last.fm/music/Queen',
    } as Artist,
    image: [
      { '#text': 'https://example.com/small.jpg', size: 'small' },
      { '#text': 'https://example.com/medium.jpg', size: 'medium' },
      { '#text': 'https://example.com/large.jpg', size: 'large' },
    ],
  },
  {
    id: 2,
    name: 'Stairway to Heaven',
    duration: '8:02',
    playcount: '800000000',
    listeners: '800M',
    mbid: '123e4567-e89b-12d3-a456-426614174002',
    url: 'https://www.last.fm/music/Led+Zeppelin/_/Stairway+to+Heaven',
    streamable: { '#text': '1', fulltrack: '0' },
    artist: {
      name: 'Led Zeppelin',
      mbid: '123e4567-e89b-12d3-a456-426614174003',
      url: 'https://www.last.fm/music/Led+Zeppelin',
    } as Artist,
    image: [
      { '#text': 'https://example.com/small.jpg', size: 'small' },
      { '#text': 'https://example.com/medium.jpg', size: 'medium' },
      { '#text': 'https://example.com/large.jpg', size: 'large' },
    ],
  },
];

export default {
  title: 'Components/SearchResults',
  component: SearchResults,
  tags: ['autodocs'],
  argTypes: {
    tracks: { control: 'object' },
    isSearching: { control: 'boolean' },
  },
};

export const TopChart = {
  args: {
    tracks: mockTracks,
    isSearching: false,
  },
};

export const SearchResultsState = {
  args: {
    tracks: [mockTracks[0]],
    isSearching: true,
  },
};

export const EmptyState = {
  args: {
    tracks: [],
    isSearching: true,
  },
};
