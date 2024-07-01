'use client';

import { redirect, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { Toast, ToastContent } from '@/components';
import { AppDispatch } from '@/redux/store';
import { getGame } from '@/redux/features/gameSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import timeLeftInSeconds from '@/helpers/timeLeftInSeconds';

import CardDeck from '@/views/_components/CardDeck';
import Board from '@/views/_components/Board';

import ActivityTab from './ActivityTab';
import ProgressbarTimer from './ProgressbarTimer';

const CreateRound = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { isConnected, isConnecting } = useTypedSelector((state) => state.account.profile);
  const { data: game, loading, isRefetching } = useTypedSelector((state) => state.game);

  useEffect(() => {
    const id = params.id as string;
    dispatch(getGame(id))
      .unwrap()
      .then((res) => {
        if (timeLeftInSeconds(res.createdAt) <= 0) {
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

  return (
    <>
      {game?.id ? (
        <>
          <div className="px-1.5">
            {game ? (
              <ProgressbarTimer
                duration={+game?.duration}
                initialTime={+game?.duration - timeLeftInSeconds(game?.createdAt)}
              />
            ) : null}
          </div>

          <div className="flex flex-col gap-4">
            <CardDeck />
            <Board />
            <ActivityTab className="md:mt-16 mt-14" key={isRefetching ? 'refetch' : 'tab'} />
            <Toast />
          </div>
        </>
      ) : (
        <div className="text-white">There is no game with this id</div>
      )}
    </>
  );
};

export default CreateRound;
