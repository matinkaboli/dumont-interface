import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axios from '@/lib/axios';

import { Faro } from '@/types/faro';

interface Account {
  address: `0x${string}` | undefined;
  isConnected: boolean;
  isConnecting: boolean;
}

interface InitialState {
  profile: Account;
  balance?: string;
  games: Faro[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  profile: { address: undefined, isConnected: false, isConnecting: true },
  balance: undefined,
  games: [],
  loading: false,
  error: null,
};

export const getPlayerGames = createAsyncThunk<Faro[], string>(
  'api/getPlayerGames',
  async (address: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`players/${address}/faros`);

      const { result } = response.data;
      return result.sort((a: any, b: any) => b.id - a.id);
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  },
);

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<Account>) => {
      state.profile = action.payload;
    },
    setBalance: (state, action: PayloadAction<string | undefined>) => {
      state.balance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayerGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlayerGames.fulfilled, (state, action: PayloadAction<Faro[]>) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(getPlayerGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setAccount, setBalance } = accountSlice.actions;
export default accountSlice.reducer;
