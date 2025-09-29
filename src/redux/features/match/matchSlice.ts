import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axios from '@/lib/axios';
import { Match } from '@/types/match';

interface State {
  matches: Match[] | null;
  recordedMatches: Match[] | null;
  match: Match | null;
  loading: boolean;
  isRefetching: boolean;
  error: string | null;
}

const initialState: State = {
  matches: null,
  recordedMatches: null,
  match: null,
  loading: false,
  isRefetching: false,
  error: null,
};

export const getLiveMatches = createAsyncThunk(
  'match/getLiveMatches',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('matches');
      return response.data.result as Match[];
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  },
);

export const getRecordedMatches = createAsyncThunk(
  'match/getRecordedMatches',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('matches/unlive');
      return response.data.result as Match[];
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  },
);

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

    // live matches
    builder
      .addCase(getLiveMatches.pending, (state) => {
        if (state.matches) {
          state.isRefetching = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(getLiveMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.isRefetching = false;
        state.matches = action.payload;
      })
      .addCase(getLiveMatches.rejected, (state, action) => {
        state.loading = false;
        state.isRefetching = false;
        state.error = (action.payload as string) || 'Failed to fetch live matches';
      });

    // recorded matches
    builder
      .addCase(getRecordedMatches.pending, (state) => {
        if (state.recordedMatches) {
          state.isRefetching = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(getRecordedMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.isRefetching = false;
        state.recordedMatches = action.payload;
      })
      .addCase(getRecordedMatches.rejected, (state, action) => {
        state.loading = false;
        state.isRefetching = false;
        state.error = (action.payload as string) || 'Failed to fetch recorded matches';
      });

    // single match details
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
