import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import makeApiUrl from '@/helpers/makeApiUrl';

type HexString = `0x${string}`;

interface Details {
  gameFactory: HexString;
  usdt: HexString;
  mont: HexString;
  networkId: string;
}

interface State {
  details: Details | null;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  details: null,
  loading: false,
  error: null,
};

export const getConfig = createAsyncThunk(
  'config/getDetails',
  async (_, { rejectWithValue }) => {
    try {
      const url = makeApiUrl('details');
      // const response = await axios.get(url);
      // return response.data.result as Details;
      return null
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  },
);

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(getConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch details';
      });
  },
});

export default configSlice.reducer;
