import SearchResults from './SearchResults.tsx';
import { type Track } from '../../types.ts';
import { mockApiData } from '../../__tests__/mock/mockApiData.ts';
const mockTracks: Track[] = mockApiData.tracks?.track ?? [];

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
