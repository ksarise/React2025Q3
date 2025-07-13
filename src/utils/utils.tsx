import { type Response, type Track } from '../type';
export const addIndeсes = (arr: Response) => {
  const Chart: Track[] = arr.tracks.track;
  return Chart.map((item, index) => ({ ...item, id: index + 1 }));
};
