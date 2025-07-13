import { Component } from 'react';
import { getPeople } from '../../api/chart.tsx';
import { type Track } from '../../type';
import { addIndeсes } from '../../utils/utils.tsx';
import SearchResult from './SearchResult';

class SearchResults extends Component {
  state = { results: [] as Track[] };
  componentDidMount(): void {
    getPeople().then((data) => {
      const tracks: Track[] = addIndeсes(data);
      console.log('tracks', tracks);
      this.setState({ results: tracks });
      localStorage.setItem('tracks', JSON.stringify(tracks));
    });
  }
  render() {
    const { results } = this.state;
    return (
      <section className="container mx-auto py-3">
        <h1 className="font-bold text-lg uppercase">SearchResults</h1>
        <div className="flex justify-center items-center gap-4 flex-col pt-3 divide-y-2 divide-sky-400 max-w-6xl py-3">
          {results &&
            results.map((item: Track) => (
              <SearchResult key={item.id} track={item} />
            ))}
        </div>
      </section>
    );
  }
}
export default SearchResults;
