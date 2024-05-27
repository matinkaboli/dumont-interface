import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { BetData } from '@/views/_components/Board';
import makeApiUrl from '@/helpers/makeApiUrl';

interface InitialState {
  betData: BetData;
  guessedResult: any;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  betData: {
    amount: '',
    keys: [],
  },
  guessedResult: null,
  loading: false,
  error: null,
};

export const postGuessedCard = createAsyncThunk<
  any,
  { id: string; cardId: string; body: any },
  { rejectValue: string }
>('api/saveGuessedCard', async ({ id, cardId, body }, { rejectWithValue }) => {
  try {
    const url = makeApiUrl(`games/${id}/cards/${cardId}`);
    const response = await axios.post(url, body);
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
    setBetData(state, action: PayloadAction<BetData>) {
      state.betData = action.payload;
    },
    clearBetData(state) {
      state.betData = initialState.betData;
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

export const { setBetData, clearBetData } = betSlice.actions;

export default betSlice.reducer;
