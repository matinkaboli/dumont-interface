import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BetData } from '@/pages/Round/Board';

interface InitialState {
  betData: BetData;
}

const initialState: InitialState = {
  betData: {
    amount: '',
    keys: [],
  },
};

const betSlice = createSlice({
  name: 'bet',
  initialState,
  reducers: {
    setBetData(state, action: PayloadAction<BetData>) {
      state.betData = action.payload;
    },
    clearBetData(state) {
      state.betData = initialState.betData;
    },
  },
});

export const { setBetData, clearBetData } = betSlice.actions;

export default betSlice.reducer;
