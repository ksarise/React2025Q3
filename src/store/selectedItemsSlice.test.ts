import reducer, {
  selectItem,
  unselectItem,
  unselectAll,
  initialState,
} from './selectedItemsSlice';
import { describe, it, expect } from 'vitest';
import { type Track } from '../types';
import { type SelectedItemsState } from './selectedItemsSlice';

const trackA = {
  name: 'Track A',
  artist: 'Artist A',
  listeners: '100',
  playcount: '200',
  url: 'http://track-a',
};
const trackB = {
  name: 'Track B',
  artist: 'Artist B',
  listeners: '300',
  playcount: '400',
  url: 'http://track-b',
};

describe('selectedItemsSlice', () => {
  it('selectItem should add track if not already selected', () => {
    const nextState = reducer(
      initialState,
      selectItem(trackA as unknown as unknown as Track)
    );
    expect(nextState.selectedTracks).toEqual([trackA]);
  });

  it('should selectItem should not add duplicate tracks by URL', () => {
    const state: SelectedItemsState = {
      selectedTracks: [trackA as unknown as Track],
    };
    const nextState = reducer(state, selectItem(trackA as unknown as Track));
    expect(nextState.selectedTracks).toEqual([trackA]);
  });

  it('should unselectItem should remove track by URL', () => {
    const state: SelectedItemsState = {
      selectedTracks: [trackA as unknown as Track, trackB as unknown as Track],
    };
    const nextState = reducer(state, unselectItem(trackA.url as string));
    expect(nextState.selectedTracks).toEqual([trackB]);
  });

  it('should unselectAll should clear all selectedTracks', () => {
    const state: SelectedItemsState = {
      selectedTracks: [trackA as unknown as Track, trackB as unknown as Track],
    };
    const nextState = reducer(state, unselectAll());
    expect(nextState.selectedTracks).toEqual([]);
  });
});
