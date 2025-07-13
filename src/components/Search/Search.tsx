import { Component } from 'react';
class Search extends Component {
  render() {
    return (
      <section className="container mx-auto py-3">
        <form action="">
          <div className="flex items-center gap-4 justify-center">
            <input
              type="search"
              name="search"
              id="searchInput"
              placeholder="Search"
              className="bg-blue-100 focus:ring-blue-500 block w-[400px] p-2.5 rounded-lg"
            />
            <button type="submit">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </form>
      </section>
    );
  }
}
export default Search;
