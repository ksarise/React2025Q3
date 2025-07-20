import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getQueryFromURL, setQueryToURL, clearQueryFromURL } from './url';

describe('URL utilities', () => {
  const originalWindowLocation = window.location;
  const originalHistoryPushState = window.history.pushState;

  beforeEach(() => {
    window.location = {
      ...originalWindowLocation,
      search: '',
      pathname: '',
    };

    window.history.pushState = vi.fn();
  });

  afterEach(() => {
    window.location = originalWindowLocation;
    window.history.pushState = originalHistoryPushState;
  });

  describe('getQueryFromURL', () => {
    it('should return null when search parameter is not present', () => {
      window.location.search = '';
      expect(getQueryFromURL()).toBe('');
    });

    it('should return empty string when search parameter is empty', () => {
      window.location.search = '?search=';
      expect(getQueryFromURL()).toBe('');
    });

    it('should return decoded query when search parameter exists', () => {
      window.location.search = '?search=test%20query';
      expect(getQueryFromURL()).toBe('test query');
    });
  });

  describe('setQueryToURL', () => {
    it('should set empty query to URL', () => {
      setQueryToURL('');
      expect(window.history.pushState).toHaveBeenCalledWith(
        null,
        '',
        '?search='
      );
    });

    it('should set simple query to URL', () => {
      setQueryToURL('test');
      expect(window.history.pushState).toHaveBeenCalledWith(
        null,
        '',
        '?search=test'
      );
    });

    it('should encode in query', () => {
      setQueryToURL('test query');
      expect(window.history.pushState).toHaveBeenCalledWith(
        null,
        '',
        '?search=test%20query'
      );
    });
  });

  describe('clearQueryFromURL', () => {
    it('should clear query from URL', () => {
      clearQueryFromURL();
      expect(window.history.pushState).toHaveBeenCalledWith(null, '', '');
    });
  });
});
