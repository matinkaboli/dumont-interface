export const FEE_PER_SECOND = 0.000625;

import { Position } from '@/types/match';

export const getTotalSize = (amount: number, multiplier: number) => amount * multiplier;

export const getFeePerMinute = (principal: number, multiplier: number) => {
  console.log('fee details');
  console.log(principal);
  console.log(multiplier);

  const borrowed = principal * (multiplier - 1);

  const feePerMinute = borrowed * FEE_PER_SECOND * 60;

  return feePerMinute;
};

export const getLiquidationThreshold = (entryOdds: number, multiplier: number): number => {
  if (multiplier === 0) return 0;

  const odds = entryOdds * 100;
  const m = multiplier * 1000;

  const drop = Math.floor((odds * 1000) / m);

  return odds > drop ? (odds - drop) / 100 : 0;
};

export const getMaximumPossibleAmount = ({
  currentOdds,
  multiplier,
  amount,
}: {
  currentOdds: number;
  multiplier: number;
  amount: number;
}): number => {
  const MAXIMUM_ODDS = 100000; // example value: 100.000%
  const SCALE = 1000; // scale factor (e.g., for 3 decimal precision)

  const odds = currentOdds * SCALE;
  const m = multiplier * SCALE;

  const oddsMultipliedToMax = Math.floor((MAXIMUM_ODDS * SCALE) / odds);
  const maximumPossibleRate = Math.floor((oddsMultipliedToMax * m) / SCALE);
  const maximumPossibleAmount = Math.floor((maximumPossibleRate * amount) / SCALE);

  return maximumPossibleAmount;
};

export const calculatePNL = (position: Position): number => {
  const amount = parseFloat(position.amount) / 1e6;
  const finalPayout = parseFloat(position.finalPayout) / 1e6;

  if (position.isLiquidated) {
    return -amount;
  }

  if (position.status === 'Closed') {
    return finalPayout - amount;
  }

  const placedPositionValue = (amount * position.multiplier) / 1e3;
  const currentPositionValue = (position.positionValue || 0) / 1e6;

  const pnl = currentPositionValue - placedPositionValue;

  const equity = amount + pnl - position.decayedAmount / 1e6;

  let returnAmount = -(amount - equity);

  if (equity >= amount) {
    returnAmount = equity - amount;
  }

  return isNaN(returnAmount) ? 0 : returnAmount;
};
