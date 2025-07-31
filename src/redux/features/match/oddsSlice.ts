import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axios from '@/lib/axios';
import { Odds } from '@/types/match';

interface State {
  odds: Odds[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  odds: null,
  loading: false,
  error: null,
};

export const getOdds = createAsyncThunk('odds/getOdds', async ({ id, start, end }: {
  id: string,
  start: string,
  end: string
}, { rejectWithValue }) => {
  try {
    const response = await axios.get(`matches/${id}/odds?start=${start}&end=${end}`);
    return response.data.result;
  } catch (error) {
    const axiosError = error as AxiosError;
    return rejectWithValue(axiosError.message);
  }
});

const oddsSlice = createSlice({
  name: 'oddsSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getOdds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOdds.fulfilled, (state, action) => {
        state.loading = false;
        state.odds = action.payload;
      })
      .addCase(getOdds.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch details';
      });
  },
});


export default oddsSlice.reducer;
