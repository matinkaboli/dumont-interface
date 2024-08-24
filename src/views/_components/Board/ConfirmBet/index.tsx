import { useMemo } from 'react';

import { Button } from '@/components';
import humanizeAmount from '@/helpers/humanizeAmount';

import { BetData } from '@/views/_components/Board';

import SelectedKey from './SelectedKey';
import BetDetailList from './BetDetailList';

const sortKeys = (keys: string[]): string[] => {
  return [...keys].sort((a: string, b: string) => {
    if (!isNaN(Number(a)) && !isNaN(Number(b))) {
      // If both are numbers, compare them as numbers
      return parseInt(a, 10) - parseInt(b, 10);
    } else if (!isNaN(Number(a))) {
      // If only 'a' is a number, it should come first
      return -1;
    } else if (!isNaN(Number(b))) {
      // If only 'b' is a number, it should come first
      return 1;
    } else {
      // Otherwise, compare them as strings
      return a.localeCompare(b);
    }
  });
};

interface Props {
  onConfirm: () => void;
  bet: BetData;
  payout: number;
  totalOdds: number;
}

const ConfirmBet = ({ bet, onConfirm, totalOdds, payout }: Props) => {
  const sortedKeys = useMemo(() => sortKeys(bet.keys), [bet.keys]);

  const betDetails = [
    { label: 'Amount', value: `$${humanizeAmount(bet.amount)}` },
    { label: 'Overall odds', value: `x${totalOdds}` },
    { label: 'Possible payout', value: `$${payout}` },
  ];

  return (
    <>
      <h3 className="text-md text-white font-medium">Confirm your bet</h3>
      <h6 className="text-base text-white font-medium mt-6">Selection</h6>
      <div className="flex flex-wrap gap-2 mt-4">
        {sortedKeys.map((key) => (
          <SelectedKey key={key}>{key}</SelectedKey>
        ))}
      </div>

      <BetDetailList className="mt-4 mb-10" items={betDetails} />

      <Button fullWidth size="md" radius="lg" onClick={onConfirm}>
        Confirm
      </Button>
    </>
  );
};

export default ConfirmBet;
