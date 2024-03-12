import { useDispatch } from 'react-redux';

import { Button } from '@/components';
import { openDialog } from '@/redux/features/dialogSlice';

import Confirm from './Confirm';

const ConfirmRound = () => {
  const dispatch = useDispatch();

  const onOpenDialog = () =>
    dispatch(
      openDialog({
        content: <Confirm />,
      }),
    );

  return (
    <Button
      variant="primary"
      size="sm"
      radius="lg"
      onClick={onOpenDialog}
      className="mt-4 mx-auto !font-bold md:w-auto w-full"
    >
      Create Round
    </Button>
  );
};

export default ConfirmRound;
