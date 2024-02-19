import { useDispatch } from 'react-redux';

import { Button } from '@/components';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import delayedPromise from '@/helpers/delayedPromise';
import LoadingMessage from '@/pages/_components/LoadingMessage';

import SelectedKey from './SelectedKey';
import BetDetailList from './BetDetailList';
import ResultMessage from './ConfirmProcess/ResultMessage';
import VerificationOperation from './ConfirmProcess/VerificationOperation';

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
    }, 500);

    const openVerificationDialog = delayedPromise(() => {
      dispatch(
        openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: <VerificationOperation />,
        }),
      );
    }, 3000);

    const onOpenResult = delayedPromise(() => {
      dispatch(
        openDialog({
          content: <ResultMessage status="success" />,
        }),
      );
    }, 5500);

    Promise.all([
      openLoadingDialog, //500ms
      delayedPromise(() => dispatch(closeDialog()), 1500),
      openVerificationDialog, //3000ms
      delayedPromise(() => dispatch(closeDialog()), 4000),
      onOpenResult, //5500ms
    ]).then(() => {});
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
