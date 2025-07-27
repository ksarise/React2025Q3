export const getCharts = async (page: number = 1) => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${import.meta.env.VITE_API_KEY}&format=json&page=${page}&limit=10`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const searchSong = async (query: string, page: number = 1) => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=${import.meta.env.VITE_API_KEY}&format=json&page=${page}&limit=10`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const getTrackInfo = async (artist: string, track: string) => {
  const response = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${import.meta.env.VITE_API_KEY}&artist=${artist}&track=${track}&format=json`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
