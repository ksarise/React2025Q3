import { type ApiResponse, type Track, type TrackSearchResult } from '../types';

export const addIndices = (data: ApiResponse): Track[] => {
  //Chart
  if (data.tracks && data.tracks.track) {
    return data.tracks.track.map((track: Track, index: number) => ({
      ...track,
      id: index + 1,
    }));
  }
  //Search
  if (
    data.results &&
    data.results.trackmatches &&
    data.results.trackmatches.track
  ) {
    return data.results.trackmatches.track.map(
      (item: TrackSearchResult, index) => {
        return {
          name: item.name,
          playcount: '',
          listeners: item.listeners,
          mbid: item.mbid,
          url: item.url,
          streamable: {
            '#text': item.streamable,
            fulltrack: '0',
          },
          artist: {
            name: item.artist,
            mbid: '',
            url: '',
          },
          image: item.image,
          id: index + 1,
          duration: '0',
        };
      }
    );
  }

  return [];
};
