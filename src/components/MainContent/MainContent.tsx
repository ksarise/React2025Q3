import React from 'react';
import SearchResults from '../SearchResults/SearchResults.tsx';
import Loader from '../Loader/Loader.tsx';
import { type MainContentProps } from '../../types.ts';

class MainContent extends React.Component<MainContentProps> {
  render() {
    const { isLoading, results, isSearching, query, error } = this.props;

    if (error) {
      return <div className="text-red-500">{error}</div>;
    }

    if (isLoading) {
      return <Loader />;
    }

    if (results.length === 0) {
      return <h1 className="font-medium text-lg">No Results Found</h1>;
    }

    return (
      <SearchResults
        tracks={results}
        isSearching={isSearching}
        searchQuery={query}
      />
    );
  }
}

export default MainContent;
