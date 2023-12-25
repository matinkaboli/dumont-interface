import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
  address?: string;
  balance?: string;
}

const initialState: AccountState = {
  address: undefined,
  balance: undefined,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<string | undefined>) => {
      state.address = action.payload;
    },
    setBalance: (state, action: PayloadAction<string | undefined>) => {
      state.balance = action.payload;
    },
  },
});

export const { setAccount, setBalance } = accountSlice.actions;
export default accountSlice.reducer;
