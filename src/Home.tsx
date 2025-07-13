import { Component } from 'react';
import Search from './components/Search/Search';
import SearchResults from './SearchResults';

export class Home extends Component {
  render() {
    return (
      <>
        <h1 className="py-3 font-bold uppercase text-2xl">Searching App</h1>
        <Search />
        <SearchResults />
      </>
    );
  }
}
