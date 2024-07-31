import links from './externalLinks';

export const totalLottieAssets = 2;

export const homePageAssets = [
  { type: 'image' as const, src: '/images/rewards-mobile.png' },
  { type: 'image' as const, src: '/images/permissionless.png' },
  { type: 'image' as const, src: '/images/mont.svg' },
  { type: 'image' as const, src: '/images/immutable.png' },
  { type: 'image' as const, src: '/images/bg-circle.png' },
  { type: 'image' as const, src: '/images/wrapped-gift.png' },
  { type: 'image' as const, src: '/images/opened-gift.png' },
  { type: 'image' as const, src: '/images/rotated-coin.png' },
  { type: 'image' as const, src: '/images/rewards-mobile.png' },
  { type: 'image' as const, src: '/images/fade-coin-bottom.png' },
];

export const faqs = [
  {
    id: '1',
    title: 'What is Dumont?',
    body: 'Dumont is a blockchain-based banking card game that offers proven immutable outcomes and instant, permissionless payouts.',
  },
  {
    id: '2',
    title: 'What blockchain network is Dumont based on?',
    body: 'Base.',
  },
  {
    id: '3',
    title: 'How is the gameplay?',
    body: `The gameplay is simple: you guess the card’s face value and win if your guess is right.\n\n[Read more about the gameplay here →](${links.GAMEPLAY})`,
  },
  {
    id: '4',
    title: 'What is the difference between Dumont and other gambling platforms?',
    body: 'There are two main differences:\n\n' +
      '- Random outcomes: we have designed a simple yet powerful cryptographic mechanism that ensures the results are immutable and truly random.\n\n' +
      `[Read more about the immutable outcome mechanism here →](${links.IMMUTABLE_OUTCOMES})\n\n` +
      '- Permissionless payouts: Winnings are immediately transferred to the player\'s address via the smart contract, eliminating the operator\'s approval for cashout.',
  },
  {
    id: '4',
    title: 'Is this a banking game?',
    body: 'Yes. Similar to slots and roulette, players compete against a system with sufficient liquidity.',
  },
  {
    id: '4',
    title: 'How much is the house fee?',
    body: '10% - This fee is applied as a 10% deduction from the user\'s winning and losing.',
  },
  {
    id: '4',
    title: 'Where does the protocol revenue go? ',
    body: '80% of the house fee collected is used to buy $MONT from the market and burn it, creating a continuous deflationary effect in the future.\n\n' +
      `[Read more about the burning mechanism →](${links.BURNING_MECHANISM})`,
  },
  {
    id: '4',
    title: 'Why should I pay 1 USDT to start a round?',
    body: 'This fee ensures honesty and covers the cost of sending the operator\'s proofs to the blockchain.',
  },
  {
    id: '4',
    title: 'What currency is used for bets?',
    body: 'Bets in Dumont are placed and settled in USDT.',
  },
  {
    id: '4',
    title: 'What is the $MONT token?',
    body: '$MONT is a token to support Dumont\'s in-game economy, it is also used as a medium for distributing game profits (house edge) to the community.\n\n' +
      `[Read more about the $MONT token here →](${links.TOKENOMICS})`,
  },
  {
    id: '4',
    title: 'As a player, what stake do I have in $MONT?',
    body: 'About 40% of our tokens will be awarded to players. \n\n' +
      `[Read more about the player rewards here →](${links.REWARD_PROGRAM})`,
  },
];
