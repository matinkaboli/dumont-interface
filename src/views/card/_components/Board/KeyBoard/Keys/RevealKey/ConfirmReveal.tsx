import { useDispatch } from 'react-redux';

import { Button, DialogTitle, Icon } from '@/components';
import { closeDialog } from '@/redux/features/dialogSlice';
import { AppDispatch } from '@/redux/store';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { MAX_FREE_REVEALS } from '@/constants/static';

const ConfirmReveal = ({ onReveal }: { onReveal: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: game } = useTypedSelector((state) => state.faro.main);

  const onCloseDialog = () => dispatch(closeDialog());

  return (
    <>
      <div className='w-14 h-14 rounded-full bg-neutral-700 flex-center mx-auto'>
        <Icon name='eye-rainbow' />
      </div>
      <DialogTitle className='mt-5 mb-2 text-center'>
        Reveal card ({game!.freeRevealRequests + 1}/{MAX_FREE_REVEALS})
      </DialogTitle>
      <p className='text-base text-neutral-300 text-center'>
        See the card’s face without placing a bet
      </p>
      <div className='flex gap-4 mt-12'>
        <Button fullWidth variant='secondary' radius='lg' onClick={onCloseDialog}>
          Cancel
        </Button>
        <Button fullWidth variant='primary' radius='lg' onClick={onReveal}>
          Reveal
        </Button>
      </div>
    </>
  );
};

export default ConfirmReveal;
