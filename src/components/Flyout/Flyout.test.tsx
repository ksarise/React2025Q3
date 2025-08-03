import { render, screen, fireEvent } from '@testing-library/react';
import {
  vi,
  type Mock,
  describe,
  it,
  expect,
  beforeEach,
  beforeAll,
} from 'vitest';
import { useSelector, useDispatch } from 'react-redux';
import SelectedItemsFlyout from './Flyout';

type SelectorFn = (state: {
  selectedItems: { selectedTracks: SelectedTrackType[] };
}) => void;

vi.mock('react-redux', async () => {
  const actual =
    await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  };
});

const mockDispatch = vi.fn();
interface SelectedTrackType {
  name: string;
  artist: { name: string };
  listeners: string;
  playcount: string;
  url: string;
}
const mockSelectedTracks: SelectedTrackType[] = [
  {
    name: 'Track 1',
    artist: { name: 'Artist 1' },
    listeners: '1000',
    playcount: '5000',
    url: 'http://example.com/1',
  },
  {
    name: 'Track 2',
    artist: { name: 'Artist 2' },
    listeners: '2000',
    playcount: '6000',
    url: 'http://example.com/2',
  },
];

describe('SelectedItemsFlyout', () => {
  beforeAll(() => {
    vi.stubGlobal('URL', {
      ...URL,
      createObjectURL: vi.fn(() => 'blob:mock-url'),
    });
  });
  beforeEach(() => {
    vi.clearAllMocks();
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as Mock).mockImplementation((fn: SelectorFn) =>
      fn({ selectedItems: { selectedTracks: mockSelectedTracks } })
    );
  });

  it('should renders selected item count and buttons', () => {
    render(<SelectedItemsFlyout />);
    expect(screen.getByText('2 items selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('should dispatches unselectAll on button click', () => {
    render(<SelectedItemsFlyout />);
    fireEvent.click(screen.getByText('Unselect all'));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('should creates and triggers CSV download on click', () => {
    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    const removeChildSpy = vi.spyOn(document.body, 'removeChild');
    const createElementSpy = vi.spyOn(document, 'createElement');

    render(<SelectedItemsFlyout />);
    fireEvent.click(screen.getByText('Download'));

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
    expect(URL.createObjectURL).toHaveBeenCalled();
  });
});
