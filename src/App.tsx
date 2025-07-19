import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import ErrorButton from './error/ErrorButton';
import { type AppState } from './types';
import appInitializer from './utils/appInitializer';
import { handleSearch } from './services/Search/searchService';
import { loadTopCharts, searchTracks } from './services/dataService';

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);

    this.state = appInitializer();
    this.updateQuery = this.updateQuery.bind(this);
    this.throwError = this.throwError.bind(this);
  }

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = () => {
    const { query, results } = this.state;

    if (query && results.length === 0) {
      this.searchTracks(query);
    } else if (!query) {
      this.loadTopCharts();
    }
  };

  loadTopCharts = async () => {
    await loadTopCharts(this);
  };

  searchTracks = async (query: string) => {
    await searchTracks(this, query);
  };

  updateQuery = ({ query }: { query: string }) => {
    handleSearch(this, query.trim());
  };

  throwError = () => {
    this.setState({ error: 'true' });
  };

  render() {
    const { isLoading, results, isSearching, query, error } = this.state;

    if (error) {
      throw new Error('Application Error: Something went wrong');
    }

    return (
      <div className="min-h-[90vh] bg-gray-900 text-white min-w-[800px]">
        <Header onQuery={this.updateQuery} initialQuery={query} />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <MainContent
              isLoading={isLoading}
              results={results}
              isSearching={isSearching}
              query={query}
              error={error}
            />
            <div className="flex gap-2 justify-center items-center mt-8">
              <ErrorButton onClick={this.throwError} />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
