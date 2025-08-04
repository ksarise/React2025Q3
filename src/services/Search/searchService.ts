import { type AppComponent } from '../../types';
import { handleClearSearch } from './clearSearchService';
import { setSearchParamsToURL } from '../../utils/url';

export function handleSearch(app: AppComponent, query: string) {
  if (!query.trim()) {
    handleClearSearch(app);
  } else {
    setSearchParamsToURL(query.trim(), 1);
    app.searchTracks(query.trim());
  }
}

export { handleClearSearch };
