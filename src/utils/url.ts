export function getSearchParamsFromURL(): {
  query: string;
  page: number;
  details?: string;
} {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('search') || '';
  const page = parseInt(params.get('page') || '1', 10);
  return { query, page };
}

export function setSearchParamsToURL(
  query: string,
  page: number = 1,
  details?: string
) {
  const params = new URLSearchParams();
  if (query) params.set('search', query);
  if (page > 1) params.set('page', String(page));
  if (details) params.set('details', details);

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, '', newUrl);
}
