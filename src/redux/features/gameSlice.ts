import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axios from '@/lib/axios';

interface Result {
  montAmount: string;
  rate: string;
  isPlayerWinner: boolean;
  revelationHash: string;
}

export interface Card {
  number: number;
  totalAmount: string;
  hash: string;
  isFreeReveal: boolean;
  guessedNumbers: any[];
  status: string;
  _id: string;
  result?: Result;
}

export interface GameData {
  _id: string;
  id: number;
  contractAddress: string;
  player: string;
  createdAt: number;
  initialization: 'INITIALIZED' | string;
  updatedAt: string;
  initializationHash: string;
  cards: Card[];
  freeRevealRequests: number;
}

interface State {
  loading: boolean;
  error: string | null;
  isCreated: boolean;
  isExpired: boolean;
  areAllCardsGuessed: boolean;
  guessedCardsCount: number;
  data: GameData | null;
  activeCardIndex: number;
  isRefetching: boolean;
}

export const getGame = createAsyncThunk<GameData, number>(
  'api/getGame',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`faros/${id}`);
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
  guessedCardsCount: 0,
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
    setGuessedCardsCount(state, action: PayloadAction<number>) {
      state.guessedCardsCount = action.payload;
    },
    setIsGameCreated(state, action: PayloadAction<boolean>) {
      state.isCreated = action.payload;
      state.isExpired = false;
    },
    resetGame() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
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

export const {
  setActiveCardIndex,
  expireGame,
  resetGame,
  setAllCardsGuessed,
  setGuessedCardsCount,
  setIsGameCreated,
} = gameSlice.actions;
export default gameSlice.reducer;
