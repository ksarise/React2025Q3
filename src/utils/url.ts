export function getQueryFromURL(): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('search') || '';
}

export function setQueryToURL(query: string) {
  window.history.pushState(null, '', `?search=${encodeURIComponent(query)}`);
}

export function clearQueryFromURL() {
  window.history.pushState(null, '', window.location.pathname);
}
