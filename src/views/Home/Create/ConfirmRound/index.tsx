import { useDispatch } from 'react-redux';

import { Button } from '@/components';
import { openDialog } from '@/redux/features/dialogSlice';

import Approve from './Approve';

const ConfirmRound = () => {
  const dispatch = useDispatch();

  const onApprove = () =>
    dispatch(
      openDialog({
        content: <Approve />,
      }),
    );

  return (
    <Button
      variant="primary"
      size="sm"
      radius="lg"
      onClick={onApprove}
      className="mt-4 mx-auto !font-bold md:w-auto w-full"
    >
      Create Round
    </Button>
  );
};

export default ConfirmRound;
