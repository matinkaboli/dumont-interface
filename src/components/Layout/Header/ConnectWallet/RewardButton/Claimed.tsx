import { useDispatch } from 'react-redux';

import { Button, DialogTitle, Icon } from '@/components';
import { AppDispatch } from '@/redux/store';
import { closeDialog } from '@/redux/features/dialogSlice';

const Claimed = () => {
  const dispatch = useDispatch<AppDispatch>();
  const onCloseDialog = () => dispatch(closeDialog());
  return (
    <>
      <div className="w-14 h-14 rounded-full bg-neutral-600 flex-center mx-auto">
        <Icon name="party-horn-rainbow" />
      </div>
      <DialogTitle className="mt-5 mb-2 text-center">The claim was successful</DialogTitle>
      <p className="text-base text-neutral-300 text-center">
        You successfully claimed <span className="text-white font-semibold">2,340 $MONT</span>
      </p>

      <Button fullWidth variant="primary" radius="lg" className="mt-6" onClick={onCloseDialog}>
        Done
      </Button>
    </>
  );
};

export default Claimed;
