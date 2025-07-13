export type MyProps = {
  message: string;
};
export type MyState = {
  count: number;
};
export type ResourceUrl = string;
export type Streamable = {
  '#text': string;
  fulltrack: string;
};

export type Artist = {
  name: string;
  mbid: string;
  url: string;
};

export type Image = {
  '#text': string;
  size: 'small' | 'medium' | 'large' | 'extralarge';
};

export interface Track {
  name: string;
  duration: string;
  playcount: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: Streamable;
  artist: Artist;
  image: Image[];
  id: number;
}
export interface Response {
  '@attr': {
    page: string;
    pages: string;
    perPage: string;
    total: string;
  };
  tracks: {
    track: Track[];
  };
}
export type SearchResultsProps = {
  tracks: Track[];
};
export type SearchResultProps = {
  track: Track;
};
