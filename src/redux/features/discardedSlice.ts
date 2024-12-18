import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axios from '@/lib/axios';

interface DiscardedCardsState {
  cards: number[];
  loading: boolean;
  isRefetching: boolean;
  error: string | null;
}

const initialState: DiscardedCardsState = {
  cards: [],
  loading: false,
  isRefetching: false,
  error: null,
};

export const getDiscardedCards = createAsyncThunk(
  'api/getDiscardedCards',
  async (gameId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`games/${gameId}/cards`);
      return response.data.result;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  },
);

const discardedCardsSlice = createSlice({
  name: 'discardedCards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDiscardedCards.pending, (state) => {
        if (state.cards) {
          state.isRefetching = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(getDiscardedCards.fulfilled, (state, action: PayloadAction<number[]>) => {
        state.loading = false;
        state.isRefetching = false;
        state.cards = action.payload;
      })
      .addCase(getDiscardedCards.rejected, (state, action) => {
        state.loading = false;
        state.isRefetching = false;
        state.error = action.payload as string;
      });
  },
});

export default discardedCardsSlice.reducer;
