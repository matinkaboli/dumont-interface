import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axios from '@/lib/axios';

import { GameData } from './gameSlice';

interface Account {
  address: `0x${string}` | undefined;
  isConnected: boolean;
  isConnecting: boolean;
}

interface InitialState {
  profile: Account;
  balance?: string;
  games: GameData[];
  loading: boolean;
  error: string | null;
  isRedirected: boolean;
}

const initialState: InitialState = {
  profile: { address: undefined, isConnected: false, isConnecting: true },
  balance: undefined,
  games: [],
  loading: false,
  error: null,
  isRedirected: false,
};

export const getPlayerGames = createAsyncThunk<GameData[], string>(
  'api/getPlayerGames',
  async (address: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`players/${address}/games`);

      const { result } = response.data;
      const sortedResult = result.sort((a: any, b: any) => b.id - a.id);

      return sortedResult;
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
    redirectPlayer(state, action: PayloadAction<boolean>) {
      state.isRedirected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayerGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlayerGames.fulfilled, (state, action: PayloadAction<GameData[]>) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(getPlayerGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setAccount, setBalance, redirectPlayer } = accountSlice.actions;
export default accountSlice.reducer;
