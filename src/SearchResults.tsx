import { Component } from 'react';
class SearchResults extends Component {
  render() {
    return (
      <section className="container mx-auto py-3">
        <h1 className="font-bold text-lg uppercase">SearchResults</h1>
        <div className="flex justify-center items-center gap-4 flex-col pt-3 divide-y-2 divide-sky-400 max-w-6xl py-3">
          <div className="w-full py-2">Found:</div>
          <div className="w-full py-2">Found:</div>
        </div>
      </section>
    );
  }
}
export default SearchResults;
