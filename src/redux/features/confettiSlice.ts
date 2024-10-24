import { createSlice } from '@reduxjs/toolkit';

import { ConfettiProps } from '@/components/Confetti';

export interface ConfettiState {
  isActive: boolean;
  confettiProps: ConfettiProps | null;
}

const initialState: ConfettiState = {
  isActive: false,
  confettiProps: null
};

const confettiSlice = createSlice({
  name: 'confetti',
  initialState,
  reducers: {
    showConfetti: (state, action) => {
      state.isActive = true;
      state.confettiProps = action.payload.confettiProps ?? null
    },
    hideConfetti: (state) => {
      state.isActive = false;
      state.confettiProps = null;
    },
    updateConfettiProps: (state, action) => {
      state.confettiProps = {
        ...state.confettiProps,
        ...action.payload,
      };
    },
  },
});

export const { showConfetti, hideConfetti, updateConfettiProps } =
  confettiSlice.actions;
export default confettiSlice.reducer;
