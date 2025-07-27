import { useState } from 'react';
import { type SearchItemProps } from '../../../types';
import Loader from '../../Loader/Loader';

const SearchItem = ({ track }: SearchItemProps) => {
  const smallImage = track.image.find((img) => img.size === 'small');
  const hasImage = smallImage && smallImage['#text'];

  const [isImageLoading, setIsImageLoading] = useState(hasImage ? true : false);

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

  return (
    <div className="grid grid-cols-12 gap-4 items-center px-4 py-3 hover:bg-gray-750 transition-colors">
      <div className="col-span-1 text-gray-400 font-medium">{track.id}</div>
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
          <div className="font-medium">{track.name}</div>
          <div className="text-xs text-gray-500">{formatedSongDuration()}</div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="text-sm">{track.artist.name}</div>
      </div>
      <div className="col-span-2 text-right text-sm">
        {parseInt(track.listeners).toLocaleString()}
      </div>
    </div>
  );
};

export default SearchItem;
