import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axios from '@/lib/axios';
import { Match } from '@/types/match';

interface State {
  matches: Match[] | null;
  match: Match | null;
  loading: boolean;
  isRefetching: boolean;
  error: string | null;
}

const initialState: State = {
  matches: null,
  match: null,
  loading: false,
  isRefetching: false,
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

export const getMatch = createAsyncThunk('match/getMatch', async (id: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(`matches/${id}`);
    return response.data.result as Match;
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
        if (state.matches) {
          state.isRefetching = true;
        } else {
          state.loading = true;
        }

        state.error = null;
      })
      .addCase(getMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.isRefetching = false;
        state.matches = action.payload;
      })
      .addCase(getMatches.rejected, (state, action) => {
        state.loading = false;
        state.isRefetching = false;
        state.error = (action.payload as string) || 'Failed to fetch details';
      });
    builder.addCase(getMatch.pending, (state) => {
      if (state.match) {
        state.isRefetching = true;
      } else {
        state.loading = true;
      }

      state.error = null;
    })
      .addCase(getMatch.fulfilled, (state, action) => {
        state.loading = false;
        state.isRefetching = false;
        state.match = action.payload;
      })
      .addCase(getMatch.rejected, (state, action) => {
        state.loading = false;
        state.isRefetching = false;
        state.error = (action.payload as string) || 'Failed to fetch match';
      });
  },
});


export default matchSlice.reducer;
