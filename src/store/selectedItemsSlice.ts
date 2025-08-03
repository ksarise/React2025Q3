import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Track } from '../types';

export interface SelectedItemsState {
  selectedTracks: Track[];
}

const initialState: SelectedItemsState = {
  selectedTracks: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<Track>) => {
      if (
        !state.selectedTracks.some((track) => track.url === action.payload.url)
      ) {
        state.selectedTracks.push(action.payload);
      }
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      state.selectedTracks = state.selectedTracks.filter(
        (track) => track.url !== action.payload
      );
    },
    unselectAll: (state) => {
      state.selectedTracks = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAll } =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
