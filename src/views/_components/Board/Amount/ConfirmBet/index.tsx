import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';

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

const ConfirmBet = ({ onConfirm }: { onConfirm: () => void }) => {
  const dispatch = useDispatch();
  const { keys, amount } = useTypedSelector((state) => state.bet.betData);

  const sortedKeys = useMemo(() => sortKeys(keys), [keys]);

  const betDetails = [
    { label: 'Amount', value: `${amount} USDT` },
    { label: 'Overall odds', value: 'x3.4' },
    { label: 'Possible payout', value: '$220' },
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
