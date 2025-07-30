import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import TrackDetails from './TrackDetails';
import { handleTrackInfo } from '../../services/dataService';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});
vi.mock('../../services/dataService', () => ({
  handleTrackInfo: vi.fn(),
}));
vi.mock('../Loader/Loader', () => ({
  default: () => <div>Loading...</div>,
}));

describe('TrackDetails', () => {
  const mockNavigate = vi.fn();
  const mockLocation = {
    search: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(mockNavigate);
    (useLocation as ReturnType<typeof vi.fn>).mockReturnValue(mockLocation);
    (handleTrackInfo as ReturnType<typeof vi.fn>).mockResolvedValue({
      name: 'Test Track',
      artist: { name: 'Test Artist' },
      album: { title: 'Test Album' },
      wiki: { published: '2023-01-01' },
      listeners: '1000',
      playcount: '2000',
    });
  });

  it('should renders Loader when loading is true', async () => {
    mockLocation.search = '?details=Test%20Artist___Test%20Track';
    (handleTrackInfo as ReturnType<typeof vi.fn>).mockImplementation(
      () => new Promise(() => {})
    );

    render(
      <MemoryRouter initialEntries={['/?details=Test%20Artist___Test%20Track']}>
        <TrackDetails />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should renders "Track not found" when detail is null after loading', async () => {
    mockLocation.search = '?details=Test%20Artist___Test%20Track';
    (handleTrackInfo as ReturnType<typeof vi.fn>).mockResolvedValue(null);

    render(
      <MemoryRouter initialEntries={['/?details=Test%20Artist___Test%20Track']}>
        <TrackDetails />
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(screen.getByText(/Track not found/)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('renders track details when data is loaded successfully', async () => {
    mockLocation.search = '?details=Test%20Artist___Test%20Track';

    render(
      <MemoryRouter initialEntries={['/?details=Test%20Artist___Test%20Track']}>
        <TrackDetails />
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(screen.getByTestId('name')).toHaveTextContent('Test Track');
        expect(screen.getByTestId('artist')).toHaveTextContent('Test Artist');
        expect(screen.getByTestId('album')).toHaveTextContent('Test Album');
        expect(screen.getByTestId('published')).toHaveTextContent(
          'Published: 2023-01-01'
        );
        expect(screen.getByTestId('listeners')).toHaveTextContent(
          'Listeners: 1000'
        );
        expect(screen.getByTestId('playcount')).toHaveTextContent(
          'Playcount: 2000'
        );
      },
      { timeout: 2000 }
    );

    expect(handleTrackInfo).toHaveBeenCalledWith('Test Artist', 'Test Track');
  });

  it('should not call handleTrackInfo when detailId is missing', () => {
    mockLocation.search = '';

    render(
      <MemoryRouter initialEntries={['/']}>
        <TrackDetails />
      </MemoryRouter>
    );

    expect(handleTrackInfo).not.toHaveBeenCalled();
  });

  it('should not call handleTrackInfo when detailId is invalid', () => {
    mockLocation.search = '?details=Invalid';

    render(
      <MemoryRouter initialEntries={['/?details=Invalid']}>
        <TrackDetails />
      </MemoryRouter>
    );

    expect(handleTrackInfo).not.toHaveBeenCalled();
  });

  it('should handles error from handleTrackInfo and shows "Track not found"', async () => {
    mockLocation.search = '?details=Test%20Artist___Test%20Track';
    (handleTrackInfo as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Fetch failed')
    );

    render(
      <MemoryRouter initialEntries={['/?details=Test%20Artist___Test%20Track']}>
        <TrackDetails />
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(screen.getByText(/Track not found/)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    expect(console.error).toHaveBeenCalledWith(
      'Failed to fetch track details:',
      expect.any(Error)
    );
  });

  it('should calls navigate to remove details param when close button is clicked', async () => {
    mockLocation.search =
      '?details=Test%20Artist___Test%20Track&search=foo&page=2';

    render(
      <MemoryRouter
        initialEntries={[
          '/?details=Test%20Artist___Test%20Track&search=foo&page=2',
        ]}
      >
        <TrackDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Track')).toBeInTheDocument();
    });

    const closeButton = screen.getByText('Close X');
    await userEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('?search=foo&page=2', {
      replace: true,
    });
  });

  it('should displays default values for optional fields when they are missing', async () => {
    mockLocation.search = '?details=Test%20Artist___Test%20Track';
    (handleTrackInfo as ReturnType<typeof vi.fn>).mockResolvedValue({
      name: 'Test Track',
      artist: { name: 'Test Artist' },
      album: undefined,
      wiki: undefined,
      listeners: undefined,
      playcount: undefined,
    });

    render(
      <MemoryRouter initialEntries={['/?details=Test%20Artist___Test%20Track']}>
        <TrackDetails />
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(screen.getByTestId('published')).toHaveTextContent(
          'Published: —'
        );
        expect(screen.getByTestId('album')).toHaveTextContent('Album: —');
        expect(screen.getByTestId('listeners')).toHaveTextContent(
          'Listeners: —'
        );
        expect(screen.getByTestId('playcount')).toHaveTextContent(
          'Playcount: —'
        );
      },
      { timeout: 2000 }
    );
  });
});
