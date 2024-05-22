import { useDispatch } from 'react-redux';

import { Button, DialogTitle, Icon } from '@/components';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { incrementRevealCount } from '@/redux/features/cardsSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import delayedPromise from '@/helpers/delayedPromise';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';
import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';

import RevealedCard from './RevealedCard';

const ConfirmReveal = () => {
  const dispatch = useDispatch();
  const { revealCount } = useTypedSelector((state) => state.cards);

  const onCloseDialog = () => dispatch(closeDialog());

  const onShowResult = async () => {
    dispatch(
      openDialog({
        dialogProps: { showCloseButton: false, disableEvents: true },
        content: (
          <AnimatedDialogContent key="loading">
            <LoadingContent title="Waiting for the network" desc="This may take a few seconds" />
          </AnimatedDialogContent>
        ),
      }),
    );

    await delayedPromise(
      () =>
        dispatch(
          openDialog({
            content: (
              <AnimatedDialogContent key="reveal">
                <RevealedCard />
              </AnimatedDialogContent>
            ),
          }),
        ),
      3000,
    );

    dispatch(incrementRevealCount());
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
