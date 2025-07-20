import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import SearchItem from './SearchItem';
import { type SearchItemProps } from '../../../types';

vi.mock('../../Loader/Loader.tsx', () => ({
  default: () => <div data-testid="loader">Loader</div>,
}));

describe('SearchItem Component', () => {
  const defaultProps: SearchItemProps = {
    track: {
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
      image: [
        {
          '#text': 'http://test.image/small.jpg',
          size: 'small',
        },
        {
          '#text': 'http://test.image/medium.jpg',
          size: 'medium',
        },
      ],
      id: 1,
    },
    isImageLoading: false,
  };

  it('renders correctly with all props', () => {
    render(<SearchItem {...defaultProps} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Test Track')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('5 000')).toBeInTheDocument();
    expect(screen.getByText('4:05')).toBeInTheDocument();
  });

  it('shows loader when image is loading', () => {
    render(<SearchItem {...defaultProps} isImageLoading={true} />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('handles image load correctly', () => {
    render(<SearchItem {...defaultProps} />);

    const img = screen.getByAltText('Test Track');
    fireEvent.load(img);

    expect(img).toHaveClass('w-10 h-10 rounded mr-3');
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('handles image error correctly', () => {
    render(<SearchItem {...defaultProps} />);

    const img = screen.getByAltText('Test Track');
    fireEvent.error(img);

    expect(img).toHaveAttribute(
      'src',
      'https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png'
    );
  });

  it('renders random duration when duration is 0 or not provided', () => {
    const propsWithoutDuration: SearchItemProps = {
      ...defaultProps,
      track: {
        ...defaultProps.track,
        duration: '0',
      },
    };

    render(<SearchItem {...propsWithoutDuration} />);

    const durationText = screen.getByText(/^\d:\d{2}$/);
    expect(durationText).toBeInTheDocument();
  });

  it('does not render image when no small image available', () => {
    const propsWithoutImage: SearchItemProps = {
      ...defaultProps,
      track: {
        ...defaultProps.track,
        image: [
          {
            '#text': 'http://test.image/medium.jpg',
            size: 'medium',
          },
        ],
      },
    };

    render(<SearchItem {...propsWithoutImage} />);

    expect(screen.queryByAltText('Test Track')).not.toBeInTheDocument();
  });

  it('initializes with correct loading state', () => {
    const propsWithImage: SearchItemProps = {
      ...defaultProps,
      track: {
        ...defaultProps.track,
        image: [
          {
            '#text': 'http://test.image/small.jpg',
            size: 'small',
          },
        ],
      },
    };

    const { container } = render(<SearchItem {...propsWithImage} />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
  });
});
