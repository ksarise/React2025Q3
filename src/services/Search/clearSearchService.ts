import { type AppComponent } from '../../types';
import { clearQueryFromURL } from '../../utils/url';
import { clearSearch } from '../../utils/localStorage';

export function handleClearSearch(app: AppComponent) {
  clearQueryFromURL();
  clearSearch();
  app.loadTopCharts();
}
