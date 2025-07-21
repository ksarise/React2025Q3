import { Component } from 'react';
import { type SearchItemProps } from '../../../types';
import Loader from '../../Loader/Loader.tsx';

class SearchItem extends Component<
  SearchItemProps,
  { isImageLoading: boolean }
> {
  constructor(props: SearchItemProps) {
    super(props);
    const { track } = this.props;
    const smallImage = track.image.find((img) => img.size === 'small');
    this.state = {
      isImageLoading: !!smallImage && !!smallImage['#text'],
    };
  }
  handleImageLoad = () => {
    this.setState({ isImageLoading: false });
  };

  handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src =
      'https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png';
    this.setState({ isImageLoading: false });
  };

  render() {
    const { track } = this.props;
    const smallImage = track.image.find((img) => img.size === 'small');
    const { isImageLoading } = this.state;

    return (
      <div className="grid grid-cols-12 gap-4 items-center px-4 py-3 hover:bg-gray-750 transition-colors">
        <div className="col-span-1 text-gray-400 font-medium">{track.id}</div>
        <div className="col-span-5 flex items-center">
          {smallImage && smallImage['#text'] ? (
            <>
              {isImageLoading && (
                <div className="w-10 h-10 flex justify-center items-center mr-3">
                  <Loader />
                </div>
              )}
              {/*
                Если увидели хоть одну не плейсхолдерную картинку, то вы
                счастливчик :D
              */}
              <img
                src={smallImage['#text']}
                alt={track.name}
                className={`w-10 h-10 rounded mr-3 ${isImageLoading ? 'hidden' : ''}`}
                onLoad={this.handleImageLoad}
                onError={this.handleImageError}
              />
            </>
          ) : null}
          <div>
            <div className="font-medium">{track.name}</div>
            <div className="text-xs text-gray-500">
              {track.duration && track.duration !== '0'
                ? `${Math.floor(parseInt(track.duration) / 60)}:${Math.floor(
                    parseInt(track.duration) % 60
                  )
                    .toString()
                    .padStart(2, '0')}`
                : (() => {
                    const seconds = Math.floor(Math.random() * 150) + 150;
                    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
                  })()}
            </div>
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
  }
}

export default SearchItem;
