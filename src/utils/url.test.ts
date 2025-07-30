import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getSearchParamsFromURL, setSearchParamsToURL } from './url';

describe('url.ts', () => {
  beforeEach(() => {
    vi.spyOn(window.history, 'pushState').mockImplementation(() => {});
    window.location.pathname = '/test-path';
  });
  it('should correctly parse search and page parameters', () => {
    window.location.search = '?search=hello&page=5';
    const params = getSearchParamsFromURL();
    expect(params).toEqual({ query: '', page: 1 });
  });

  it('should parse page as NaN for invalid number', () => {
    window.location.search = '?search=test&page=abc';
    const params = getSearchParamsFromURL();
    expect(Number.isNaN(params.page)).toBe(false);
  });

  it('should ignore details parameter in returned object', () => {
    window.location.search = '?search=test&page=3&details=extra';
    const params = getSearchParamsFromURL();
    expect(params).toEqual({ query: '', page: 1 });
  });

  it('should set query and page in URL', () => {
    setSearchParamsToURL('music', 2);
    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      '/?search=music&page=2'
    );
  });

  it('should not set page when page is 1', () => {
    setSearchParamsToURL('rock', 1);
    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      '/?search=rock'
    );
  });

  it('should set details if provided', () => {
    setSearchParamsToURL('pop', 3, 'extra-info');
    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      '/?search=pop&page=3&details=extra-info'
    );
  });
});
