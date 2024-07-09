const transformRanks = (ranks: string[]): number[] => {
  return ranks.map((rank) => {
    switch (rank) {
      case 'A':
        return 0;
      case 'J':
        return 10;
      case 'Q':
        return 11;
      case 'K':
        return 12;
      default:
        return parseInt(rank, 10) - 1;
    }
  });
};

export default transformRanks;
