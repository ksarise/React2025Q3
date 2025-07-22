import { Component } from 'react';
import { type SearchResultsProps } from '../../types.ts';
import SearchItem from './SearchItem/SearchItem.tsx';

class SearchResults extends Component<SearchResultsProps> {
  render() {
    console.log(this.props.tracks);
    return (
      <section className="container mx-auto py-3">
        <h1 className="font-medium text-lg">
          {this.props.isSearching ? <>Search Results</> : <>Top Chart Tracks</>}
        </h1>
        <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs text-gray-500 font-medium border-b border-gray-700 w-full">
          <div className="col-span-1 w-12">#</div>
          <div className="col-span-5 min-w-[200px]">TRACK</div>
          <div className="col-span-3 min-w-[150px]">ARTIST</div>
          <div className="col-span-2 text-right min-w-[100px]">LISTENERS</div>
          <div className="col-span-1 w-12"></div>
        </div>
        <div className="divide-y divide-gray-700 w-full">
          {this.props.tracks.map((item) => (
            <SearchItem key={item.id} track={item} isImageLoading={false} />
          ))}
        </div>
      </section>
    );
  }
}

export default SearchResults;
