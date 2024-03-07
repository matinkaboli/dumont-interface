import { createSlice } from '@reduxjs/toolkit';
import { Card } from '@/types';

const cards: Card[] = [
  { id: 53, src: '/images/card-placeholder.png' },
  ...Array.from({ length: 52 }, (_, index) => ({
    id: index + 1,
    src: '/images/card.png',
    revealedSrc: null,
    isRevealed: false,
  })),
];

const initialState = {
  cards,
  activeCardIndex: 0,
  revealCount: 0,
};

const cardsSlice = createSlice({
  name: 'cardsSlide',
  initialState,
  reducers: {
    setCards(state, action) {
      state.cards = action.payload;
    },
    setActiveCardIndex(state, action) {
      state.activeCardIndex = action.payload;
    },
    incrementRevealCount: (state) => {
      if (state.revealCount < 4) {
        state.revealCount += 1;
      }
    },
  },
});

export const { setCards, setActiveCardIndex, incrementRevealCount } = cardsSlice.actions;
export default cardsSlice.reducer;
