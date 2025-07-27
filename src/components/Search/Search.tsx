import { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import { type SearchProps } from '../../types';

const Search = ({ initialQuery = '', onQuery }: SearchProps) => {
  const [query, setQuery] = useState(initialQuery);
  const prevInitialQueryRef = useRef(initialQuery);

  useEffect(() => {
    if (
      prevInitialQueryRef.current !== initialQuery &&
      initialQuery !== query
    ) {
      setQuery(initialQuery);
    }
    prevInitialQueryRef.current = initialQuery;
  }, [initialQuery, query]);

  const handleClick = () => {
    onQuery({ query });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onQuery({ query });
    }
  };

  return (
    <section className="relative">
      <div className="flex items-center">
        <input
          type="search"
          name="search"
          id="searchInput"
          placeholder="Search for tracks, artists.."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full bg-gray-800 text-white py-3 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700"
        />
        <button
          type="button"
          onClick={handleClick}
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
};

export default Search;
