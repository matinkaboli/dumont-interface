import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import makeApiUrl from '@/helpers/makeApiUrl';

export interface Card {
  revealed: number;
  hash: string;
  isFreeReveal: boolean;
  guessedNumbers: any[];
  status: string;
  _id: string;
}

interface GameData {
  _id: string;
  id: string;
  address: `0x${string}`;
  revealer: string;
  player: string;
  duration: string;
  claimableAfter: string;
  maxFreeReveals: string;
  gameCreationFee: string;
  gameCreatedAt: string;
  cards: Card[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  freeRevealRequests: number;
}

interface State {
  loading: boolean;
  error: string | null;
  isCreated: boolean;
  data: GameData | null;
  activeCardIndex: number;
  isRefetching: boolean;
}

export const postGame = createAsyncThunk<GameData, Record<string, any>>(
  'api/postGame',
  async (requestData: any, { rejectWithValue }) => {
    try {
      const url = makeApiUrl('games');
      const response = await axios.post(url, requestData);
      return response.data.result;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  },
);

export const getGame = createAsyncThunk<GameData, string>(
  'api/getGame',
  async (id: string, { rejectWithValue }) => {
    try {
      const url = makeApiUrl(`games/${id}`);
      const response = await axios.get(url);
      return response.data.result;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  },
);

const initialState: State = {
  loading: false,
  error: null,
  isCreated: false,
  data: null,
  activeCardIndex: 0,
  isRefetching: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setActiveCardIndex(state, action: PayloadAction<number>) {
      state.activeCardIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postGame.pending, (state) => {
        state.loading = true;
        state.isCreated = false;
        state.error = null;
      })
      .addCase(postGame.fulfilled, (state, action) => {
        state.loading = false;
        state.isCreated = true;
        state.data = action.payload;
      })
      .addCase(postGame.rejected, (state, action) => {
        state.loading = false;
        state.isCreated = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getGame.pending, (state) => {
        if (state.data) {
          state.isRefetching = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(getGame.fulfilled, (state, action: PayloadAction<GameData>) => {
        state.loading = false;
        state.isRefetching = false;
        state.data = action.payload;
      })
      .addCase(getGame.rejected, (state, action) => {
        state.loading = false;
        state.isRefetching = false;
        state.error = action.payload as string;
      });
  },
});

export const { setActiveCardIndex } = gameSlice.actions;
export default gameSlice.reducer;
