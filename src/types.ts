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
export interface ApiResponse {
  '@attr': {
    page: string;
    pages: string;
    perPage: string;
    total: string;
  };
  tracks?: {
    track: Track[];
  };
  results?: {
    trackmatches: {
      track: TrackSearchResult[];
    };
  };
}
export interface TrackSearchResult {
  name: string;
  artist: string;
  url: string;
  streamable: string;
  listeners: string;
  image: Image[];
  mbid: string;
}
export type SearchResultsProps = {
  tracks: Track[];
  isSearching: boolean;
  searchQuery: string;
};
export type SearchItemProps = {
  track: Track;
  isImageLoading: boolean;
};
export type AppState = {
  query: string;
  results: Track[];
  isLoading: boolean;
  error: string | null;
  isSearching: boolean;
};
export type SearchProps = {
  onQuery: (arg0: { query: string }) => void;
  initialQuery?: string;
};
export type SearchState = {
  query: string;
};
export interface HeaderProps {
  onQuery: (arg: { query: string }) => void;
  initialQuery: string;
}
export interface MainContentProps {
  isLoading: boolean;
  results: Track[];
  isSearching: boolean;
  query: string;
  error: string | null;
}
