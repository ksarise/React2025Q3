import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { type SearchItemProps } from '../../../types';
import Loader from '../../Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { selectItem, unselectItem } from '../../../store/selectedItemsSlice';
import type { RootState } from '../../../store/store';

const SearchItem = ({ track }: SearchItemProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const smallImage = track.image.find((img) => img.size === 'small');
  const hasImage = smallImage && smallImage['#text'];

  const [isImageLoading, setIsImageLoading] = useState(hasImage ? true : false);
  const selectedTracks = useSelector(
    (state: RootState) => state.selectedItems.selectedTracks
  );
  const isSelected = selectedTracks.some((t) => t.url === track.url);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src =
      'https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png';
    setIsImageLoading(false);
  };

  const formatedSongDuration = () => {
    if (track.duration && track.duration !== '0') {
      const totalSeconds = parseInt(track.duration);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = Math.floor(totalSeconds % 60)
        .toString()
        .padStart(2, '0');
      return `${minutes}:${seconds}`;
    } else {
      const seconds = Math.floor(Math.random() * 150) + 150;
      const minutes = Math.floor(seconds / 60);
      const secs = (seconds % 60).toString().padStart(2, '0');
      return `${minutes}:${secs}`;
    }
  };

  const handleClick = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('details', `${track.artist.name}___${track.name}`);
    navigate(`?${searchParams.toString()}`);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(selectItem(track));
    } else {
      dispatch(unselectItem(track.url));
    }
  };

  return (
    <div
      onClick={handleClick}
      className="grid grid-cols-12 gap-4 items-center px-4 py-3 bg-gray-200 dark:bg-gray-900 hover:bg-gray-400 dark:hover:bg-gray-750 transition-colors cursor-pointer"
    >
      <div className="col-span-1 text-gray-600 dark:text-gray-400 font-medium">
        {track.id}
      </div>
      <div className="col-span-5 flex items-center">
        {hasImage ? (
          <>
            {isImageLoading && (
              <div className="w-10 h-10 flex justify-center items-center mr-3">
                <Loader />
              </div>
            )}
            <img
              src={smallImage['#text']}
              alt={track.name}
              className={`w-10 h-10 rounded mr-3 ${isImageLoading ? 'hidden' : ''}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </>
        ) : null}
        <div>
          <div className="font-medium text-black dark:text-white">
            {track.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {formatedSongDuration()}
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="text-sm text-black dark:text-white">
          {track.artist.name}
        </div>
      </div>
      <div className="col-span-2 text-right text-sm text-gray-700 dark:text-gray-300">
        {parseInt(track.listeners).toLocaleString()}
      </div>
      <div className="col-span-1 flex justify-end">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()}
          className="mr-2 size-5 accent-red-700"
        />
      </div>
    </div>
  );
};

export default SearchItem;
