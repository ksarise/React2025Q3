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
  tracks?: {
    track: Track[];
    '@attr': {
      page: string;
      totalPages: string;
      perPage: string;
      total: string;
    };
  };
  results?: {
    'opensearch:totalResults': string;
    'opensearch:itemsPerPage': string;
    'opensearch:Query': {
      '@role': string;
      '#text': string;
      startPage: string;
    };
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
  onItemClick: (track: Track) => void;
};
export type SearchItemProps = {
  track: Track;
  isImageLoading: boolean;
  onClick: () => void;
};
export type AppState = {
  query: string;
  results: Track[];
  isLoading: boolean;
  error: string | null;
  isSearching: boolean;
  currentPage: number;
  totalPages: number;
  totalResults?: number;
  itemsPerPage: number;
};
export type SearchProps = {
  onQuery: (arg0: { query: string }) => void;
  initialQuery?: string;
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
  onItemClick: (track: Track) => void;
}
export interface AppComponent extends React.Component<object, AppState> {
  loadTopCharts: () => Promise<void>;
  searchTracks: (query: string) => Promise<void>;
}
export interface TrackDetails {
  name: string;
  artist: { name: string };
  album: { title: string };
  listeners?: string;
  playcount?: string;
  duration?: string;
  wiki?: {
    published: string;
  };
}
