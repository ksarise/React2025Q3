import { Component } from 'react';
import Search from './components/Search/Search';
import SearchResults from './components/SearchResults/SearchResults';

export class Home extends Component {
  render() {
    return (
      <>
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="py-3 font-bold uppercase text-2xl">Searching App</h1>
          <Search />
          <SearchResults />
        </div>
      </>
    );
  }
}
