import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SelectedItemsState {
  selectedUrls: string[];
}

const initialState: SelectedItemsState = {
  selectedUrls: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<string>) => {
      if (!state.selectedUrls.includes(action.payload)) {
        state.selectedUrls.push(action.payload);
      }
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      state.selectedUrls = state.selectedUrls.filter(
        (url) => url !== action.payload
      );
    },
  },
});

export const { selectItem, unselectItem } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
