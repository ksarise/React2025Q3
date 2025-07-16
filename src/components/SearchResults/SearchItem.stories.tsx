import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchItem from './SearchItem.tsx';
import { type Track } from '../../types';

const mockTrack: Track = {
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
};

const meta: Meta<typeof SearchItem> = {
  title: 'Components/SearchItem',
  component: SearchItem,
  tags: ['autodocs'],
  argTypes: {
    track: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof SearchItem>;

export const Default: Story = {
  args: {
    track: mockTrack,
  },
};

export const LongTrackName: Story = {
  args: {
    track: {
      ...mockTrack,
      name: 'This Is a Very Long Track Name That Should Be Truncated in UI',
      duration: '0',
    },
  },
};

export const NoImage: Story = {
  args: {
    track: {
      ...mockTrack,
      image: [],
    },
  },
};
