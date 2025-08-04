import {
  fetchTopCharts,
  fetchSearchTracks,
  fetchTrackInfo,
} from './apiService';
import type { Track, TrackDetails } from '../types';

export async function handleSearch(
  query: string,
  saveSearch: (
    query: string,
    tracks: Track[],
    page: number,
    totalPages: number,
    totalResults: number
  ) => void,
  page: number
) {
  const trimmed = query.trim();
  if (!trimmed) {
    return handleClearSearch(saveSearch, page);
  }
  const { tracks, pagination } = await fetchSearchTracks(trimmed, page);
  saveSearch(
    trimmed,
    tracks,
    pagination.currentPage,
    pagination.totalPages,
    pagination.totalResults
  );

  return { tracks, pagination };
}

export async function handleClearSearch(
  saveSearch: (
    query: string,
    tracks: Track[],
    page: number,
    totalPages: number,
    totalResults: number
  ) => void,
  page: number
) {
  const { tracks, pagination } = await fetchTopCharts(page);

  saveSearch(
    '',
    tracks,
    pagination.currentPage,
    pagination.totalPages,
    pagination.totalResults
  );
  return { tracks, pagination };
}

export async function handleTrackInfo(
  artist: string,
  track: string
): Promise<TrackDetails> {
  const data = await fetchTrackInfo(artist, track);
  return {
    name: data.name,
    artist: { name: data.track.artist.name },
    album: { title: data.track.album.title },
    wiki: { published: data.track.wiki?.published },
    listeners: data.track.listeners,
    playcount: data.track.playcount,
    duration: data.track.duration,
  };
}
