import Image from 'next/image';
import { useDispatch } from 'react-redux';

import { Button, DialogDescription, DialogTitle } from '@/components';
import { closeDialog } from '@/redux/features/dialogSlice';

const RevealedCard = () => {
  const dispatch = useDispatch();
  const onCloseDialog = () => dispatch(closeDialog());

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
