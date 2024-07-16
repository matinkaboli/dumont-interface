import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import makeApiUrl from '@/helpers/makeApiUrl';

interface Result {
  number: number;
  status: string;
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
}

const initialState: InitialState = {
  guessedResult: null,
  loading: false,
  error: null,
};

export const postGuessedCard = createAsyncThunk<
  any,
  { id: string; body: any },
  { rejectValue: string }
>('api/saveGuessedCard', async ({ id, body }, { rejectWithValue }) => {
  try {
    const url = makeApiUrl(`games/${id}/cards`);
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
  reducers: {},
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

export default betSlice.reducer;
