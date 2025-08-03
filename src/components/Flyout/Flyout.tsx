import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { unselectAll } from '../../store/selectedItemsSlice';
import type { Track } from '../../types';

const Flyout = () => {
  const selectedTracks = useSelector(
    (state: RootState) => state.selectedItems.selectedTracks
  );
  const dispatch = useDispatch();

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    const headers = ['Name', 'Artist', 'Listeners', 'Playcount', 'URL'];
    const rows = selectedTracks.map((track: Track) => [
      `"${track.name.replace(/"/g, '""')}"`,
      `"${track.artist.name.replace(/"/g, '""')}"`,
      track.listeners,
      track.playcount,
      `"${track.url.replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedTracks.length}_items.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed bottom-0 left-0 z-10 bg-gray-800 p-4 text-white flex justify-between items-center gap-2">
      <p>{selectedTracks.length} items selected</p>
      <div>
        <button
          onClick={handleUnselectAll}
          className="mr-2 bg-gray-700 hover:bg-gray-600 text-white font-medium py-1 px-3 rounded"
        >
          Unselect all
        </button>
        <button
          onClick={handleDownload}
          className="bg-red-600 hover:bg-red-500 text-white font-medium py-1 px-3 rounded"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Flyout;
