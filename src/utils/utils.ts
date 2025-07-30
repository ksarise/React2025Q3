import {
  type ApiResponse,
  type Track,
  type TrackSearchResult,
  type Artist,
  type Streamable,
} from '../types';

export const addIndices = (data: ApiResponse): Track[] => {
  if (data.tracks && data.tracks.track) {
    return data.tracks.track.map((track, index) => ({
      ...track,
      id: index + 1,
      artist:
        typeof track.artist === 'string'
          ? { name: track.artist, mbid: '', url: '' }
          : track.artist,
      streamable:
        typeof track.streamable === 'string'
          ? { '#text': track.streamable, fulltrack: '0' }
          : track.streamable,
    }));
  }

  if (data.results && data.results.trackmatches?.track) {
    return data.results.trackmatches.track.map(
      (item: TrackSearchResult, index) => {
        const artist: Artist = {
          name: item.artist,
          mbid: item.mbid || '',
          url: '',
        };

        const streamable: Streamable = {
          '#text': item.streamable || '0',
          fulltrack: '0',
        };

        return {
          name: item.name,
          playcount: '0',
          listeners: item.listeners || '0',
          mbid: item.mbid || '',
          url: item.url || '',
          streamable,
          artist,
          image: item.image || [],
          id: index + 1,
          duration: '0',
        };
      }
    );
  }

  return [];
};

export const extractPaginationData = (data: ApiResponse) => {
  if (data?.tracks) {
    return {
      currentPage: parseInt(data.tracks['@attr'].page || '1'),
      totalPages: parseInt(data.tracks['@attr'].totalPages),
      totalResults: parseInt(data.tracks['@attr'].total),
      itemsPerPage: parseInt(data.tracks['@attr'].perPage || '10'),
    };
  }

  if (data?.results) {
    const totalResults = parseInt(
      data.results['opensearch:totalResults'] || '0'
    );
    const itemsPerPage = parseInt(
      data.results['opensearch:itemsPerPage'] || '10'
    );

    return {
      currentPage: parseInt(
        data.results['opensearch:Query']['startPage'] || '1'
      ),
      totalPages: Math.ceil(totalResults / itemsPerPage),
      totalResults,
      itemsPerPage,
    };
  }

  return {
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    itemsPerPage: 10,
  };
};
