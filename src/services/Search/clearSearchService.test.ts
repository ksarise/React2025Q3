import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleClearSearch } from './clearSearchService';
import { setSearchParamsToURL } from '../../utils/url';
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

    expect(setSearchParamsToURL).toHaveBeenCalledWith('', 1);
    expect(mockApp.loadTopCharts).toHaveBeenCalled();
  });
});
