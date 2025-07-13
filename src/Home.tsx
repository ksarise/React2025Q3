import { Component } from 'react';
import Search from './Search.tsx';
import SearchResults from './SearchResults.tsx';

export class Home extends Component {
  render() {
    return (
      <>
        <Search />
        <SearchResults />
      </>
    );
  }
}
