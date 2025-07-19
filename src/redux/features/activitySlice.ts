import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axios from '@/lib/axios';

interface Activity {
  index: number;
  status: 'FREE_REVEAL_REQUESTED' | 'GUESSED' | 'REVEALED' | 'CLAIMED';
  requestedAt: number;
  revealDate: string;
  betAmount: string;
  totalAmount: string;
  revelationHash?: string;
  hash: string;
  result?: {
    isPlayerWinner: boolean;
    isFreeReveal: boolean;
    montAmount: string;
    rate: string;
  };
}

interface ActivitiesState {
  activities: Activity[];
  loading: boolean;
  isRefetching: boolean;
  error: string | null;
}

const initialState: ActivitiesState = {
  activities: [],
  loading: false,
  isRefetching: false,
  error: null,
};

export const getActivities = createAsyncThunk(
  'api/getActivities',
  async (gameId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`faros/${gameId}/activities`);
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
      .addCase(getActivities.pending, (state) => {
        if (state.activities) {
          state.isRefetching = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(getActivities.fulfilled, (state, action: PayloadAction<Activity[]>) => {
        state.loading = false;
        state.isRefetching = false;
        state.activities = action.payload;
      })
      .addCase(getActivities.rejected, (state, action) => {
        state.loading = false;
        state.isRefetching = false;
        state.error = action.payload as string;
      });
  },
});

export default discardedCardsSlice.reducer;
