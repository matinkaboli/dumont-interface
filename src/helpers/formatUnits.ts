import BN from 'bignumber.js';

const formatUnits = (amount: string, decimals: number) => {
  return new BN(amount).times(10 ** decimals);
};

export default formatUnits;
