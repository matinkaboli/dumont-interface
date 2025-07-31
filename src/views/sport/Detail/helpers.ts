export const getTotalSize = (amount: number, multiplier: number) => amount * multiplier;

export const getFeePerMinute = (totalSize: number) => totalSize / 15;

export const getLiquidationThreshold = (entryOdds: number, multiplier: number): number => {
  if (multiplier === 0) return 0;

  const odds = entryOdds * 100;
  const m = multiplier * 1000;

  const drop = Math.floor((odds * 1000) / m);

  return odds > drop ? (odds - drop) / 100 : 0;
};

export const getMaximumPossibleAmount = (
  { currentOdds, multiplier, amount }: {
    currentOdds: number,
    multiplier: number,
    amount: number
  },
): number => {
  const MAXIMUM_ODDS = 100000; // example value: 100.000%
  const SCALE = 1000; // scale factor (e.g., for 3 decimal precision)

  const odds = currentOdds * SCALE;
  const m = multiplier * SCALE;

  const oddsMultipliedToMax = Math.floor((MAXIMUM_ODDS * SCALE) / odds);
  const maximumPossibleRate = Math.floor((oddsMultipliedToMax * m) / SCALE);
  const maximumPossibleAmount = Math.floor(
    (maximumPossibleRate * amount) / SCALE,
  );

  return maximumPossibleAmount;
};
