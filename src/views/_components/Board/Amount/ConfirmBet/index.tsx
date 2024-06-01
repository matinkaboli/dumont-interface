import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components';
import { openDialog } from '@/redux/features/dialogSlice';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';

import SelectedKey from './SelectedKey';
import BetDetailList from './BetDetailList';
import ResultMessage from './ConfirmProcess/ResultMessage';
import VerificationOperation from './ConfirmProcess/VerificationOperation';


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

const ConfirmBet = () => {
  const dispatch = useDispatch();
  const { keys, amount } = useTypedSelector((state) => state.bet.betData);

  const sortedKeys = useMemo(() => sortKeys(keys), [keys]);

  const betDetails = [
    { label: 'Amount', value: `${amount} USDT` },
    { label: 'Overall odds', value: 'x3.4' },
    { label: 'Possible payout', value: '$220' },
  ];

  const onConfirm = () => {
    const delayedDispatch = (action: any, delay: number) =>
      setTimeout(() => {
        dispatch(action);
      }, delay);

    const dialogs = [
      {
        action: openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <AnimatedDialogContent key="loading">
              <LoadingContent
                title="Sign the transaction"
                desc="Sign this transaction in your wallet"
              />
            </AnimatedDialogContent>
          ),
        }),
        delay: 500,
      },
      {
        action: openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <AnimatedDialogContent key="verification">
              <VerificationOperation />
            </AnimatedDialogContent>
          ),
        }),
        delay: 3000,
      },
      {
        action: openDialog({
          content: (
            <AnimatedDialogContent key="result">
              <ResultMessage />
            </AnimatedDialogContent>
          ),
        }),
        delay: 5500,
      },
    ];

    dialogs.forEach(({ action, delay }) => delayedDispatch(action, delay));
  };

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
