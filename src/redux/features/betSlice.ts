import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axios from '@/lib/axios';

interface Result {
  number: number;
  status: string;
  betAmount: string;
  totalAmount: string;
  _id: string;
  result: {
    isPlayerWinner: boolean;
    usdtAmount: string;
    montAmount: string;
  };
}

interface InitialState {
  guessedResult: Result | null;
  loading: boolean;
  error: string | null;
  minBetAmount: number;
  maxBetAmount: number;
}

const initialState: InitialState = {
  guessedResult: null,
  loading: false,
  error: null,
  minBetAmount: 0,
  maxBetAmount: 0,
};

export const postGuessedCard = createAsyncThunk<
  any,
  { id: string; body: any },
  { rejectValue: string }
>('api/saveGuessedCard', async ({ id, body }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`games/${id}/cards`, body);
    return response.data.result;
  } catch (error) {
    const axiosError = error as AxiosError;
    return rejectWithValue(axiosError.message);
  }
});

const betSlice = createSlice({
  name: 'bet',
  initialState,
  reducers: {
    setMinBetAmount: (state, action: PayloadAction<number>) => {
      state.minBetAmount = action.payload;
    },
    setMaxBetAmount: (state, action: PayloadAction<number>) => {
      state.maxBetAmount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postGuessedCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postGuessedCard.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.guessedResult = action.payload;
      })
      .addCase(postGuessedCard.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { setMinBetAmount, setMaxBetAmount } = betSlice.actions;

export default betSlice.reducer;
