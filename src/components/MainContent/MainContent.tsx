import SearchResults from '../SearchResults/SearchResults';
import Loader from '../Loader/Loader';
import { type MainContentProps, type Track } from '../../types';

const MainContent = ({
  isLoading,
  results,
  isSearching,
  query,
  error,
  onItemClick,
}: MainContentProps) => {
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
      onItemClick={(track: Track) => onItemClick(track)}
    />
  );
};

export default MainContent;
