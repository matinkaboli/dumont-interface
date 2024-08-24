import BN, { BigNumber } from 'bignumber.js';

const toFixedNumber = (num: string | number | BigNumber, decimals: number = 2) => {
  const n = Number(num.toString()).toFixed(decimals);

  const bn = new BN(n);

  return bn.toString();
};

export default toFixedNumber;
