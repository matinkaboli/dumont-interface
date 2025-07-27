import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  loading: boolean;
  error: string | null;
  minBetAmount: number;
  maxBetAmount: number;
}

const initialState: InitialState = {
  loading: false,
  error: null,
  minBetAmount: 0,
  maxBetAmount: 0,
};

const betSlice = createSlice({
  name: 'bet',
  initialState,
  reducers: {
    setMinBetAmount: (state, action: PayloadAction<number>) => {
      state.minBetAmount = action.payload;
    },
    setMaxBetAmount: (state, action: PayloadAction<number>) => {
      state.maxBetAmount = action.payload;
    },
  },
});

export const { setMinBetAmount, setMaxBetAmount } = betSlice.actions;

export default betSlice.reducer;
