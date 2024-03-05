import { useDispatch } from 'react-redux';

import { Button, DialogTitle, Icon } from '@/components';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import {incrementRevealCount} from '@/redux/features/revealSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import RevealedCard from './RevealedCard';

const ConfirmReveal = () => {
  const { revealCount } = useTypedSelector((state) => state.reveal);
  const dispatch = useDispatch();

  const onCloseDialog = () => dispatch(closeDialog());

  const onShowResult = () => {
    onCloseDialog();
    new Promise((resolve) => setTimeout(resolve, 300)).then(() => {
      dispatch(openDialog({ content: <RevealedCard /> }));
      dispatch(incrementRevealCount());
    });
  };

  return (
    <>
      <div className="w-14 h-14 rounded-full bg-neutral-600 flex-center mx-auto">
        <Icon name="eye-rainbow" />
      </div>
      <DialogTitle className="mt-5 mb-2 text-center">Reveal card ({revealCount + 1}/3)</DialogTitle>
      <p className="text-base text-neutral-300 text-center">
        See the card’s face without placing a bet
      </p>
      <hr className="border-t border-neutral-600 my-6 -mx-6" />
      <div className="flex gap-4">
        <Button fullWidth variant="secondary" radius="lg" onClick={onCloseDialog}>
          Cancel
        </Button>
        <Button fullWidth variant="primary" radius="lg" onClick={onShowResult}>
          Reveal
        </Button>
      </div>
    </>
  );
};

export default ConfirmReveal;
