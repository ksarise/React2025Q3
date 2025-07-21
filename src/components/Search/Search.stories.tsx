import type { Meta, StoryObj } from '@storybook/react-vite';
import Search from './Search.tsx';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  tags: ['autodocs'],
  argTypes: {
    initialQuery: { control: 'text' },
    onQuery: { action: 'querySubmitted' },
  },
};

export default meta;

type Story = StoryObj<typeof Search>;

export const Default: Story = {
  args: {
    initialQuery: '',
    onQuery: ({ query }) => console.log('Search query:', query),
  },
};

export const WithInitialQuery: Story = {
  args: {
    initialQuery: 'Queen',
    onQuery: ({ query }) => console.log('Search query:', query),
  },
};

export const LongQuery: Story = {
  args: {
    initialQuery:
      'This is a very long search query that should be truncated in the input field',
    onQuery: ({ query }) => console.log('Search query:', query),
  },
};
