import { useDispatch } from 'react-redux';

import { Button, DialogTitle, Icon } from '@/components';
import { closeDialog } from '@/redux/features/dialogSlice';
import humanizeAmount from '@/helpers/humanizeAmount';

const Claimed = ({ amount }: { amount: number }) => {
  const dispatch = useDispatch();
  const onCloseDialog = () => dispatch(closeDialog());

  return (
    <>
      <div className="w-14 h-14 rounded-full bg-neutral-700 flex-center mx-auto">
        <Icon name="check-rainbow" />
      </div>
      <DialogTitle className="mt-5 mb-2 text-center">Success</DialogTitle>
      <p className="text-base text-neutral-300 text-center">
        You successfully claimed{' '}
        <span className="text-white font-semibold">{humanizeAmount(amount)} $MONT</span>
      </p>

      <Button fullWidth variant="primary" radius="lg" className="mt-6" onClick={onCloseDialog}>
        Done
      </Button>
    </>
  );
};

export default Claimed;
