import React from 'react';
import './App.css';
import Search from './components/Search/Search';
import SearchResults from './components/SearchResults/SearchResults';
import { getCharts, searchSong } from './api/chart';
import { type Track, type AppState, type ApiResponse } from './type';
import { addIndices } from './utils/utils';
import Loader from './components/Loader/Loader';

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    const savedQuery = localStorage.getItem('term') || '';
    const savedResults = localStorage.getItem('searchResults');

    this.state = {
      query: savedQuery,
      results: savedResults ? JSON.parse(savedResults) : [],
      isLoading: false,
    };

    this.updateQuery = this.updateQuery.bind(this);
    this.loadTopCharts = this.loadTopCharts.bind(this);
    this.searchTracks = this.searchTracks.bind(this);
  }

  componentDidMount(): void {
    if (this.state.query && this.state.results.length === 0) {
      this.searchTracks(this.state.query);
    } else if (!this.state.query) {
      this.loadTopCharts();
    }
  }

  loadTopCharts() {
    this.setState({ isLoading: true });
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

  render() {
    const isSearching = this.state.query.trim() !== '';

    return (
      <div className="min-h-screen bg-gray-900 text-white min-w-[800px]">
        <header className="bg-black py-4 px-6 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-red-600 mr-6">almost.fm</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Search
              onQuery={this.updateQuery}
              initialQuery={this.state.query}
            />
            {this.state.isLoading ? (
              <Loader />
            ) : (
              <SearchResults
                tracks={this.state.results}
                isSearching={isSearching}
                searchQuery={this.state.query}
              />
            )}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
