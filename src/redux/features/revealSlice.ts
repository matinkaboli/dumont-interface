import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  revealCount: 0,
};

const revealSlice = createSlice({
  name: 'revealSlice',
  initialState,
  reducers: {
    incrementRevealCount: (state) => {
      if (state.revealCount < 4) {
        state.revealCount += 1;
      }
    },
    resetRevealCount: (state) => {
      state.revealCount = initialState.revealCount;
    },
  },
});

export const { incrementRevealCount, resetRevealCount } = revealSlice.actions;

export default revealSlice.reducer;
