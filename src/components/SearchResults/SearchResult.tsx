import { Component } from 'react';
import { type SearchResultProps } from '../../type';
export class SearchResult extends Component<SearchResultProps, object> {
  render() {
    return (
      <div className="w-full py-2">
        <span>
          {' '}
          <strong>Song:</strong> {this.props.track.name},
        </span>
        <span>
          {' '}
          <strong>Artist:</strong> {this.props.track.artist.name},
        </span>
        <span>
          {' '}
          <strong>Playcount:</strong> {this.props.track.playcount},
        </span>
      </div>
    );
  }
}
export default SearchResult;
