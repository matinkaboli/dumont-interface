import Image from 'next/image';

import { Button, DialogDescription, DialogTitle } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import getCardInfo from '@/helpers/getCardInfo';

const RevealedCard = ({ onCloseDialog }: { onCloseDialog: () => void }) => {
  const { guessedResult } = useTypedSelector((state) => state.bet);

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
