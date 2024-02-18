import { useDispatch } from 'react-redux';

import { Button } from '@/components';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import delayedPromise from '@/helpers/delayedPromise';
import LoadingMessage from '@/pages/_components/LoadingMessage';

import SelectedKey from './SelectedKey';
import BetDetailList from './BetDetailList';
import ResultMessage from './ResultMessage';

const betDetails = [
  { label: 'Amount', value: '125 DAI' },
  { label: 'Overall odds', value: 'x3.4' },
  { label: 'Possible payout', value: '$220' },
];

const ConfirmBet = () => {
  const dispatch = useDispatch();
  const onConfirm = () => {
    dispatch(closeDialog());

    const openLoadingDialog = delayedPromise(() => {
      dispatch(
        openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <LoadingMessage
              title="Sign the transaction"
              desc="Sign this transaction in your wallet"
            />
          ),
        }),
      );
    }, 300);

    const delayedCloseDialog = delayedPromise(() => dispatch(closeDialog()), 2000);

    Promise.all([openLoadingDialog, delayedCloseDialog]).then(() => {
      dispatch(
        openDialog({
          content: (
            <ResultMessage status="success" />
          ),
        }),
      );
    });
  };

  return (
    <>
      <h3 className="text-md text-white font-medium">Confirm your bet</h3>
      <h6 className="text-base text-white font-medium mt-6">Selection</h6>
      <div className="flex gap-2 mt-4">
        <SelectedKey>7</SelectedKey>
        <SelectedKey>K</SelectedKey>
      </div>

      <BetDetailList className="mt-4 mb-10" items={betDetails} />

      <Button fullWidth size="md" radius="lg" onClick={onConfirm}>
        Confirm
      </Button>
    </>
  );
};

export default ConfirmBet;
