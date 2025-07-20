import type { ApiResponse, Artist } from '../../types';

const mockApiData: ApiResponse = {
  '@attr': { page: '1', pages: '1', perPage: '2', total: '2' },
  tracks: {
    track: [
      {
        id: 1,
        name: 'Bohemian Rhapsody',
        duration: '5:55',
        playcount: '1200000000',
        listeners: '1.2B',
        mbid: '123e4567-e89b-12d3-a456-426614174000',
        url: 'https://www.last.fm/music/Queen/_/Bohemian+Rhapsody',
        streamable: { '#text': '1', fulltrack: '0' },
        artist: {
          name: 'Queen',
          mbid: '123e4567-e89b-12d3-a456-426614174001',
          url: 'https://www.last.fm/music/Queen',
        } as Artist,
        image: [
          { '#text': 'https://example.com/small.jpg', size: 'small' },
          { '#text': 'https://example.com/medium.jpg', size: 'medium' },
          { '#text': 'https://example.com/large.jpg', size: 'large' },
        ],
      },
      {
        id: 2,
        name: 'Stairway to Heaven',
        duration: '8:02',
        playcount: '800000000',
        listeners: '800M',
        mbid: '123e4567-e89b-12d3-a456-426614174002',
        url: 'https://www.last.fm/music/Led+Zeppelin/_/Stairway+to+Heaven',
        streamable: { '#text': '1', fulltrack: '0' },
        artist: {
          name: 'Led Zeppelin',
          mbid: '123e4567-e89b-12d3-a456-426614174003',
          url: 'https://www.last.fm/music/Led+Zeppelin',
        } as Artist,
        image: [
          { '#text': 'https://example.com/small.jpg', size: 'small' },
          { '#text': 'https://example.com/medium.jpg', size: 'medium' },
          { '#text': 'https://example.com/large.jpg', size: 'large' },
        ],
      },
    ],
  },
};
export { mockApiData };
const mockApiSongSearchData: ApiResponse = {
  '@attr': { page: '1', pages: '1', perPage: '1', total: '1' },
  results: {
    trackmatches: {
      track: [
        {
          name: 'Bohemian Rhapsody',
          artist: 'Queen',
          url: 'https://www.last.fm/music/Queen/_/Bohemian+Rhapsody',
          streamable: '1',
          listeners: '1000',
          mbid: 'f1',
          image: [
            { '#text': 'image1-small', size: 'small' },
            { '#text': 'image1-large', size: 'large' },
          ],
        },
      ],
    },
  },
};

export { mockApiSongSearchData };
