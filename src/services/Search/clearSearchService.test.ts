import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleClearSearch } from './clearSearchService';
import { clearQueryFromURL } from '../../utils/url';
import { clearSearch } from '../../utils/localStorage';
import { type AppComponent } from '../../types';

vi.mock('../../utils/url');
vi.mock('../../utils/localStorage');

describe('clearSearchService', () => {
  const mockApp = {
    loadTopCharts: vi.fn(),
  } as unknown as AppComponent;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should clear URL, localStorage and load top charts', () => {
    handleClearSearch(mockApp);

    expect(clearQueryFromURL).toHaveBeenCalled();
    expect(clearSearch).toHaveBeenCalled();
    expect(mockApp.loadTopCharts).toHaveBeenCalled();
  });
});
