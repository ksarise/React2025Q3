import React from 'react';
import './App.css';
import Search from './components/Search/Search';
import SearchResults from './components/SearchResults/SearchResults';
import { getCharts, searchSong } from './api/chart';
import { type Track, type AppState, type ApiResponse } from './type';
import { addIndeсes } from './utils/utils';

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      query: localStorage.getItem('term') || '',
      results: [],
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.loadTopCharts = this.loadTopCharts.bind(this);
    this.searchTracks = this.searchTracks.bind(this);
  }

  componentDidMount(): void {
    this.loadTopCharts();
  }

  loadTopCharts() {
    getCharts().then((data: ApiResponse) => {
      const tracks: Track[] = addIndeсes(data);
      this.setState({ results: tracks });
    });
  }

  searchTracks(query: string) {
    searchSong(query).then((data: ApiResponse) => {
      const tracks: Track[] = addIndeсes(data);
      this.setState({ results: tracks });
    });
  }

  updateQuery(nextState: { query: string }) {
    const query = nextState.query.trim();
    this.setState({ query });
    localStorage.setItem('term', query);

    if (query === '') {
      this.loadTopCharts();
    } else {
      this.searchTracks(query);
    }
  }

  render() {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="bg-black py-4 px-6 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-red-600 mr-6">Almost.fm</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Search
              onQuery={this.updateQuery}
              initialQuery={this.state.query}
            />
            <SearchResults
              tracks={this.state.results}
              isSearching={this.state.query.trim() !== ''}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
