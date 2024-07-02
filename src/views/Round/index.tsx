'use client';

import { useEffect } from 'react';
import { redirect, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { Toast, ToastContent } from '@/components';
import { AppDispatch } from '@/redux/store';
import { getGame } from '@/redux/features/gameSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import timeLeftInSeconds from '@/helpers/timeLeftInSeconds';
import isEmpty from '@/helpers/isEmpty';

import CardDeck from '@/views/_components/CardDeck';
import Board from '@/views/_components/Board';

import ActivityTab from './ActivityTab';
import ProgressbarTimer from './ProgressbarTimer';

const ESTIMATED_LOADING_TIME = 10;

const CreateRound = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { isConnected, isConnecting } = useTypedSelector((state) => state.account.profile);
  const { data: game, loading, isRefetching } = useTypedSelector((state) => state.game);

  useEffect(() => {
    dispatch(getGame(id as string))
      .unwrap()
      .then((res) => {
        if (timeLeftInSeconds(res.createdAt) <= ESTIMATED_LOADING_TIME) {
          toast(
            <ToastContent
              variant="neutral"
              title="Good luck!"
              description="You have successfully created the round."
            />,
            { position: 'bottom-right', toastId: 'welcome' },
          );
        }
      });
  }, []);

  if (isConnecting || (loading && !isRefetching))
    return <div className="text-white">Loading...</div>;

  if (!isConnected) {
    redirect('/');
  }

  if (isEmpty(game)) {
    return <div className="text-white">There is no game with this id</div>;
  }

  return (
    <>
      <div className="px-1.5">
        <ProgressbarTimer
          duration={+game!.duration}
          initialTime={+game!.duration - timeLeftInSeconds(game!.createdAt)}
        />
      </div>

      <div className="flex flex-col gap-4">
        <CardDeck needsShuffling={timeLeftInSeconds(game!.createdAt) <= ESTIMATED_LOADING_TIME} />
        <Board />
        <ActivityTab className="md:mt-16 mt-14" key={isRefetching ? 'refetch' : 'tab'} />
        <Toast />
      </div>
    </>
  );
};

export default CreateRound;
