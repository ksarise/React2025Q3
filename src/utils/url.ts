export function getSearchParamsFromURL(): { query: string; page: number } {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('search') || '';
  const page = parseInt(params.get('page') || '1', 10);
  return { query, page };
}

export function setSearchParamsToURL(query: string, page: number = 1) {
  const params = new URLSearchParams();
  if (query) params.set('search', query);
  if (page > 1) params.set('page', String(page));

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, '', newUrl);
}
