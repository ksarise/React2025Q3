export const getCharts = async () => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${import.meta.env.VITE_API_KEY}&format=json&limit=10`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
export const searchSong = async (query: string) => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=${import.meta.env.VITE_API_KEY}&format=json&limit=10`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
