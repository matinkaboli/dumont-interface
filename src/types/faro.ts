interface Result {
  montAmount: string;
  rate: string;
  isPlayerWinner: boolean;
  revelationHash: string;
}

export interface Card {
  number: number;
  totalAmount: string;
  hash: string;
  isFreeReveal: boolean;
  guessedNumbers: any[];
  status: string;
  _id: string;
  result?: Result;
}

export interface Faro {
  _id: string;
  id: number;
  contractAddress: string;
  player: string;
  createdAt: number;
  initialization: 'INITIALIZED' | string;
  updatedAt: string;
  initializationHash: string;
  cards: Card[];
  freeRevealRequests: number;
}

export interface Activity {
  index: number;
  status: 'FREE_REVEAL_REQUESTED' | 'GUESSED' | 'REVEALED' | 'CLAIMED';
  requestedAt: number;
  revealDate: string;
  betAmount: string;
  totalAmount: string;
  revelationHash?: string;
  hash: string;
  result?: {
    isPlayerWinner: boolean;
    isFreeReveal: boolean;
    montAmount: string;
    rate: string;
  };
}
