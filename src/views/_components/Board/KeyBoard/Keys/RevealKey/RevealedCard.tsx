import Image from 'next/image';
import { useDispatch } from 'react-redux';

import { Button, DialogDescription, DialogTitle } from '@/components';
import { swiperRef } from '@/components/Carousel';
import { closeDialog } from '@/redux/features/dialogSlice';
import { getGame } from '@/redux/features/gameSlice';
import { AppDispatch } from '@/redux/store';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import getCardInfo from '@/helpers/getCardInfo';

const RevealedCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { guessedResult } = useTypedSelector((state) => state.bet);
  const { data: game } = useTypedSelector((state) => state.game);

  const onCloseDialog = () => {
    dispatch(getGame(game!.id)).unwrap().then(() => {
      dispatch(closeDialog());

      // @ts-ignore
      swiperRef?.current?.slideNext();
    });
  };

  return (
    <>
      <Image
        width={160}
        height={223}
        src={`/images/cards/${getCardInfo(guessedResult!.number)}.png`}
        className="mx-auto"
        alt=""
      />
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
