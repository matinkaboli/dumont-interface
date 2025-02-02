import { BigNumber } from 'bignumber.js';

const truncateDecimals = (num: number, decimalPlaces: number): number => {
  const factor = Math.pow(10, decimalPlaces);

  return Math.trunc(num * factor) / factor;
};

const toFixedNumber = (num: string | number | BigNumber, decimals: number = 2) => {
  return truncateDecimals(Number(num?.toString()), decimals).toString();
};

export default toFixedNumber;
