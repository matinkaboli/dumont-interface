import Image from 'next/image';
import { useDispatch } from 'react-redux';

import { Button, DialogDescription, DialogTitle } from '@/components';
import { closeDialog } from '@/redux/features/dialogSlice';
import { setCards } from '@/redux/features/cardsSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const RevealedCard = () => {
  const dispatch = useDispatch();
  const { activeCardIndex, cards } = useTypedSelector((state) => state.cards);

  const updateCardByIndex = (index: number, revealedSrc: string, isRevealed: boolean) => {
    const updatedCards = cards.map((card, i) => {
      if (i === index) {
        return { ...card, revealedSrc, isRevealed };
      }
      return card;
    });
    dispatch(setCards(updatedCards));
  };
  const onCloseDialog = () => {
    dispatch(closeDialog());
    updateCardByIndex(activeCardIndex, '/images/card-show.png', true);
  };

  return (
    <>
      <Image width={160} height={223} src="/images/card-show.png" className="mx-auto" alt="" />
      <DialogTitle className="mt-6 text-center">Card revealed 👀</DialogTitle>
      <DialogDescription className="mt-2 text-center">
        You have removed this card from the game
      </DialogDescription>
      <Button fullWidth radius="lg" className="mt-8" onClick={onCloseDialog}>
        Continue the game
      </Button>
    </>
  );
};

export default RevealedCard;
