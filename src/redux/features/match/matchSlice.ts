import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axios from '@/lib/axios';
import { Match } from '@/types/match';

interface State {
  matches: Match[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  matches: null,
  loading: false,
  error: null,
};

export const getMatches = createAsyncThunk('match/getMatches', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('matches');
    return response.data.result as Match[];
  } catch (error) {
    const axiosError = error as AxiosError;
    return rejectWithValue(axiosError.message);
  }
});

const matchSlice = createSlice({
  name: 'matchSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload;
      })
      .addCase(getMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch details';
      });
  },
});


export default matchSlice.reducer;
