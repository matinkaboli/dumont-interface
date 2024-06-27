const getCardInfo = (cardNumber: number): string => {
  if (cardNumber < 0 || cardNumber > 51) {
    return 'Invalid card number. Please enter a number between 0 and 51.';
  }

  const suits: string[] = ['hearts', 'spades', 'diamonds', 'clubs'];
  const ranks: string[] = [
    'ace',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'jack',
    'queen',
    'king',
  ];

  // Determine the suit
  const suitIndex: number = Math.floor(cardNumber / 13);
  const suit: string = suits[suitIndex];

  // Determine the rank
  const rankIndex: number = cardNumber % 13;
  const rank: string = ranks[rankIndex];

  return `${rank}-${suit}`;
};

export default getCardInfo;
