'use client';

import { redirect, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import CardDeck from '@/views/_components/CardDeck';
import Board from '@/views/_components/Board';
import { Toast, ToastContent } from '@/components';
import { AppDispatch } from '@/redux/store';
import { getGame } from '@/redux/features/gameSlice';

import ActivityTab from './ActivityTab';
import ProgressbarTimer from './ProgressbarTimer';

const CreateRound = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { isCreated } = useTypedSelector((state) => state.game);
  const { isConnected } = useTypedSelector((state) => state.account.profile);
  const { data: game } = useTypedSelector((state) => state.game);

  useEffect(() => {
    const id = params.id as string;
    dispatch(getGame(id));

    toast(
      <ToastContent
        variant="neutral"
        title="Good luck!"
        description="You have successfully created the round."
      />,
      { position: 'bottom-right' },
    );

    return () => {
      toast.dismiss();
    };
  }, []);

  if (!isConnected || !isCreated) {
    redirect('/');
  }

  return (
    <>
      <div className="px-1.5">
        {game ? <ProgressbarTimer duration={+game.duration} /> : null}
      </div>

      <div className="flex flex-col gap-4">
        <CardDeck />
        <Board />
        <ActivityTab className="md:mt-16 mt-14" />
        <Toast />
      </div>
    </>
  );
};

export default CreateRound;
