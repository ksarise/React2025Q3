import { getCharts, searchSong } from '../api/chart';
import { addIndices } from '../utils/utils';
import { type Track } from '../types';

export async function fetchTopCharts(): Promise<Track[]> {
  const data = await getCharts();
  return addIndices(data);
}

export async function fetchTracks(query: string): Promise<Track[]> {
  const data = await searchSong(query);
  return addIndices(data);
}
