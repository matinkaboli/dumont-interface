import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axios from '@/lib/axios';

export interface Card {
  number: number;
  hash: string;
  isFreeReveal: boolean;
  guessedNumbers: any[];
  status: string;
  _id: string;
}

export interface GameData {
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
  isExpired: boolean;
  areAllCardsGuessed: boolean;
  data: GameData | null;
  activeCardIndex: number;
  isRefetching: boolean;
}

export const postGame = createAsyncThunk<GameData, Record<string, any>>(
  'api/postGame',
  async (requestData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post('games', requestData);
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
      const response = await axios.get(`games/${id}`);
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
  isExpired: false,
  areAllCardsGuessed: false,
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
    expireGame(state, action: PayloadAction<boolean>) {
      state.isExpired = action.payload;
    },
    setAllCardsGuessed(state, action: PayloadAction<boolean>) {
      state.areAllCardsGuessed = action.payload;
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

export const { setActiveCardIndex, expireGame, setAllCardsGuessed } = gameSlice.actions;
export default gameSlice.reducer;
