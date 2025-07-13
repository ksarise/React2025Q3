export const getCharts = async () => {
  const response = await fetch(
    'https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=96356d898b4dbfd7da44d3c624d4898e&format=json&limit=10'
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
export const searchSong = async (query: string) => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=96356d898b4dbfd7da44d3c624d4898e&format=json&limit=10`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
