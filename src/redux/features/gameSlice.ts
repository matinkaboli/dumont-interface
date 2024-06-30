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
  leakedCount: number;
  activeCardIndex: number;
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
  leakedCount: 3,
  activeCardIndex: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    decrementLeakedCount: (state) => {
      if (state.leakedCount > 0) {
        state.leakedCount -= 1;
      }
    },
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
        state.loading = true;
        state.error = null;
      })
      .addCase(getGame.fulfilled, (state, action: PayloadAction<GameData>) => {
        state.loading = false;
        state.data = action.payload;
        state.leakedCount = action.payload.freeRevealRequests;
      })
      .addCase(getGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { decrementLeakedCount, setActiveCardIndex } = gameSlice.actions;
export default gameSlice.reducer;
