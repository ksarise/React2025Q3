import { type AppComponent } from '../../types';
import { setSearchParamsToURL } from '../../utils/url';

export function handleClearSearch(app: AppComponent) {
  setSearchParamsToURL('', 1);
  app.loadTopCharts();
}
