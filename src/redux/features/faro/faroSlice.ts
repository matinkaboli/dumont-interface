import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import {Faro} from '@/types/faro';
import axios from '@/lib/axios';

interface State {
  loading: boolean;
  error: string | null;
  isCreated: boolean;
  isExpired: boolean;
  areAllCardsGuessed: boolean;
  guessedCardsCount: number;
  data: Faro | null;
  activeCardIndex: number;
  isRefetching: boolean;
}

export const getGame = createAsyncThunk<Faro, number>(
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

const faroSlice = createSlice({
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
      .addCase(getGame.fulfilled, (state, action: PayloadAction<Faro>) => {
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
} = faroSlice.actions;
export default faroSlice.reducer;
