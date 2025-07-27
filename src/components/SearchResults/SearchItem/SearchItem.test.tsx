import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import SearchItem from './SearchItem';
import { type SearchItemProps, type Image } from '../../../types';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../Loader/Loader.tsx', () => ({
  default: () => <div data-testid="loader">Loader</div>,
}));

describe('SearchItem Component', () => {
  const defaultTrack: SearchItemProps['track'] = {
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
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should renders correctly with all props', () => {
    render(
      <SearchItem
        track={defaultTrack}
        isImageLoading={false}
        onClick={() => {}}
      />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Test Track')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('5 000')).toBeInTheDocument();
    expect(screen.getByText('4:05')).toBeInTheDocument();
  });

  it('should shows loader initially and hides it after image load', () => {
    render(
      <SearchItem
        track={defaultTrack}
        isImageLoading={false}
        onClick={() => {}}
      />
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    const img = screen.getByAltText('Test Track');
    fireEvent.load(img);

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(img).toBeVisible();
  });

  it('should uses fallback image on image error', () => {
    render(
      <SearchItem
        track={defaultTrack}
        isImageLoading={false}
        onClick={() => {}}
      />
    );
    const img = screen.getByAltText('Test Track');

    fireEvent.error(img);
    expect(img).toHaveAttribute(
      'src',
      'https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png'
    );
  });

  it('should displays random duration if track duration is 0', () => {
    const noDurationTrack = { ...defaultTrack, duration: '0' };
    render(
      <SearchItem
        track={noDurationTrack}
        isImageLoading={false}
        onClick={() => {}}
      />
    );
    const regex = /^\d+:\d{2}$/;
    expect(screen.getByText(regex)).toBeInTheDocument();
  });

  it('should renders without image if small image is missing', () => {
    const noImageTrack = {
      ...defaultTrack,
      image: [
        {
          '#text': '',
          size: 'small' as Image['size'],
        },
      ],
    };
    render(
      <SearchItem
        track={noImageTrack}
        isImageLoading={false}
        onClick={() => {}}
      />
    );
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('should calls navigate on click with correct search params', () => {
    render(
      <SearchItem
        track={defaultTrack}
        isImageLoading={false}
        onClick={() => {}}
      />
    );
    fireEvent.click(screen.getByText('Test Track'));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    const callArg = mockNavigate.mock.calls[0][0];
    expect(callArg).toContain('?details=Test+Artist___Test+Track');
  });
});
