import { createSlice } from '@reduxjs/toolkit';

const confirmationSlice = createSlice({
  name: 'createRound',
  initialState: {
    isConfirmed: false,
  },
  reducers: {
    confirmRound: (state) => {
      state.isConfirmed = true;
    },
    resetRoundConfirmation: (state) => {
      state.isConfirmed = false;
    },
  },
});

export const { confirmRound, resetRoundConfirmation } = confirmationSlice.actions;

export default confirmationSlice.reducer;
