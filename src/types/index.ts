export interface Card {
  id: number;
  src: string;
  revealedSrc?: string | null;
  isRevealed?: boolean;
}
