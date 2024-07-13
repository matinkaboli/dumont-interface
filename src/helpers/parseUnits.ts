import BigNumber from 'bignumber.js';

function parseUnits(amount: string | number | BigNumber, decimals: number = 18): BigNumber {
  const value = new BigNumber(amount);
  return value.dividedBy(new BigNumber(10).pow(decimals));
}

export default parseUnits;
