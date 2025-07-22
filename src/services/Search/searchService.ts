import { type AppComponent } from '../../types';
import { handleClearSearch } from './clearSearchService';

export function handleSearch(app: AppComponent, query: string) {
  if (!query.trim()) {
    handleClearSearch(app);
  } else {
    app.searchTracks(query.trim());
  }
}

export { handleClearSearch };
