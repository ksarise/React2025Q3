import React from 'react';
import './App.css';
import Search from './components/Search/Search';
import SearchResults from './components/SearchResults/SearchResults';
import { getCharts, searchSong } from './api/chart';
import { type Track, type AppState, type ApiResponse } from './types';
import { addIndices } from './utils/utils';
import Loader from './components/Loader/Loader';

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    const urlParams = new URLSearchParams(window.location.search);
    const urlSearch = urlParams.get('search');
    const savedQuery = localStorage.getItem('term') || '';
    const savedResults = localStorage.getItem('searchResults');
    const initialQuery = urlSearch || savedQuery;
    const isInitialSearch = !!initialQuery;
    this.state = {
      query: initialQuery,
      results: savedResults ? JSON.parse(savedResults) : [],
      isLoading: false,
      error: null,
      isSearching: isInitialSearch,
    };

    this.updateQuery = this.updateQuery.bind(this);
    this.loadTopCharts = this.loadTopCharts.bind(this);
    this.searchTracks = this.searchTracks.bind(this);
  }

  componentDidMount(): void {
    if (this.state.query) {
      if (this.state.results.length === 0) {
        this.searchTracks(this.state.query);
      }
    } else {
      this.loadTopCharts();
    }
  }

  loadTopCharts() {
    this.setState({ isLoading: true, isSearching: false });

    getCharts()
      .then((data: ApiResponse) => {
        const tracks: Track[] = addIndices(data);
        this.setState({
          results: tracks,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  searchTracks(query: string) {
    this.setState({
      isLoading: true,
      query: query,
      isSearching: true,
    });
    window.history.pushState(null, '', `?search=${encodeURIComponent(query)}`);

    searchSong(query)
      .then((data: ApiResponse) => {
        const tracks: Track[] = addIndices(data);
        localStorage.setItem('term', query);
        localStorage.setItem('searchResults', JSON.stringify(tracks));

        this.setState({
          results: tracks,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  updateQuery({ query }: { query: string }) {
    const updatedQuery = query.trim();

    if (updatedQuery === '') {
      window.history.pushState(null, '', window.location.pathname);
      localStorage.removeItem('term');
      localStorage.removeItem('searchResults');
      this.loadTopCharts();
    } else {
      this.searchTracks(updatedQuery);
    }
  }

  throwError = () => {
    this.setState({ error: 'true' });
  };

  render() {
    if (this.state.error) {
      throw new Error('OOOPS! Something went wrong');
    }
    return (
      <div className="min-h-[90vh] bg-gray-900 text-white min-w-[800px]">
        <header className="bg-black py-4 px-6 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-red-600 mr-6">almost.fm</h1>
          </div>
          <Search onQuery={this.updateQuery} initialQuery={this.state.query} />
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {this.state.isLoading ? (
              <Loader />
            ) : this.state.results.length === 0 ? (
              <h1 className="font-medium text-lg ">No Results Found</h1>
            ) : (
              <SearchResults
                tracks={this.state.results}
                isSearching={this.state.isSearching}
                searchQuery={this.state.query}
              />
            )}
            <div className="flex gap-2 justify-center items-center">
              <button
                onClick={this.throwError}
                className="text-white bg-[#ec2d2d] rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
              >
                Test Error Boundary
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
