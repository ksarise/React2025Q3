import { Component, type MouseEventHandler } from 'react';
import { type SearchProps, type SearchState } from '../../types';

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      query: props.initialQuery || '',
    };
  }

  componentDidUpdate(prevProps: SearchProps) {
    if (prevProps.initialQuery !== this.props.initialQuery) {
      this.setState({ query: this.props.initialQuery || '' });
    }
  }

  handleClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault();
    this.props.onQuery({ query: this.state.query });
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.props.onQuery({ query: this.state.query });
    }
  };

  render() {
    return (
      <section className="relative">
        <div className="flex items-center">
          <input
            type="search"
            name="search"
            id="searchInput"
            placeholder="Search for tracks, artists.."
            value={this.state.query}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            className="w-full bg-gray-800 text-white py-3 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700"
          />

          <button
            type="button"
            onClick={this.handleClick}
            className="ml-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            Search
          </button>
        </div>
      </section>
    );
  }
}

export default Search;
