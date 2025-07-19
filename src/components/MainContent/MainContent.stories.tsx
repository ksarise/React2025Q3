import type { Meta, StoryObj } from '@storybook/react-vite';
import MainContent from './MainContent.tsx';
import { type Track, type ApiResponse } from '../../types.ts';
import { addIndices } from '../../utils/utils';

type Story = StoryObj<typeof MainContent>;

const mockApiResponse: ApiResponse = {
  '@attr': {
    page: '1',
    pages: '1',
    perPage: '2',
    total: '2',
  },
  tracks: {
    track: [
      {
        id: 1,
        name: 'Bohemian Rhapsody',
        duration: '355',
        playcount: '1200000000',
        listeners: '1200000000',
        mbid: '123e4567-e89b-12d3-a456-426614174000',
        url: 'https://www.last.fm/music/Queen/_/Bohemian+Rhapsody',
        streamable: { '#text': '1', fulltrack: '0' },
        artist: {
          name: 'Queen',
          mbid: '123e4567-e89b-12d3-a456-426614174001',
          url: 'https://www.last.fm/music/Queen',
        },
        image: [
          {
            '#text':
              'https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png',
            size: 'small',
          },
        ],
      },
      {
        id: 2,
        name: 'Stairway to Heaven',
        duration: '482',
        playcount: '800000000',
        listeners: '800000000',
        mbid: '123e4567-e89b-12d3-a456-426614174002',
        url: 'https://www.last.fm/music/Led+Zeppelin/_/Stairway+to+Heaven',
        streamable: { '#text': '1', fulltrack: '0' },
        artist: {
          name: 'Led Zeppelin',
          mbid: '123e4567-e89b-12d3-a456-426614174003',
          url: 'https://www.last.fm/music/Led+Zeppelin',
        },
        image: [
          {
            '#text':
              'https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png',
            size: 'small',
          },
        ],
      },
    ],
  },
};

const mockTracks: Track[] = addIndices(mockApiResponse);

const meta: Meta<typeof MainContent> = {
  title: 'Components/MainContent',
  component: MainContent,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-6 max-w-4xl mx-auto">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const LoadingState: Story = {
  args: {
    isLoading: true,
    results: [],
    isSearching: false,
    query: '',
    error: null,
  },
};

export const ErrorState: Story = {
  args: {
    isLoading: false,
    results: [],
    isSearching: false,
    query: '',
    error: 'Failed to load data. Please try again later.',
  },
};

export const NoResults: Story = {
  args: {
    isLoading: false,
    results: [],
    isSearching: true,
    query: 'nonexistent query',
    error: null,
  },
};

export const TopCharts: Story = {
  args: {
    isLoading: false,
    results: mockTracks,
    isSearching: false,
    query: '',
    error: null,
  },
};

export const SearchResults: Story = {
  args: {
    isLoading: false,
    results: mockTracks,
    isSearching: true,
    query: 'queen',
    error: null,
  },
};

export const SingleResult: Story = {
  args: {
    isLoading: false,
    results: [mockTracks[0]],
    isSearching: true,
    query: 'bohemian',
    error: null,
  },
};
