import type { Meta, StoryObj } from '@storybook/react-vite';
import MainContent from './MainContent.tsx';
import { type Track, type ApiResponse } from '../../types.ts';
import { addIndices } from '../../utils/utils';
import { mockApiData } from '../../__tests__/mock/mockApiData.ts';
type Story = StoryObj<typeof MainContent>;

const mockApiResponse: ApiResponse = mockApiData;

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
