import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Account {
  address: `0x${string}` | undefined;
  isConnected: boolean;
  isConnecting: boolean;
}

interface InitialState {
  profile: Account;
  balance?: string;
}

const initialState: InitialState = {
  profile: { address: undefined, isConnected: false, isConnecting: true },
  balance: undefined,
};

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
});

export const { setAccount, setBalance } = accountSlice.actions;
export default accountSlice.reducer;
