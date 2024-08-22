'use client';

import { useEffect } from 'react';
import { redirect, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { Loading, Toast, ToastContent } from '@/components';
import { AppDispatch } from '@/redux/store';
import { getGame, setAllCardsGuessed, setGuessedCardsCount } from '@/redux/features/gameSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import timeLeftInSeconds from '@/helpers/timeLeftInSeconds';
import isEmpty from '@/helpers/isEmpty';
import { MAX_GUESSABLE_CARDS } from '@/constants/static';

import CardDeck from '@/views/_components/CardDeck';
import Board from '@/views/_components/Board';
import CreateRound from '@/views/_components/CreateRound';

import ActivityTab from './ActivityTab';
import ProgressbarTimer from './ProgressbarTimer';

const Round = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { isConnected } = useTypedSelector((state) => state.account.profile);
  const {
    data: game,
    loading,
    isCreated,
    isExpired,
    isRefetching,
    areAllCardsGuessed,
  } = useTypedSelector((state) => state.game);

  useEffect(() => {
    dispatch(getGame(id as string))
      .unwrap()
      .then(() => {
        if (isCreated) {
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
  }, [id]);

  useEffect(() => {
    if (isExpired) {
      toast(
        <ToastContent variant="neutral" title="Expired!" description="Your game has expired." />,
        { position: 'bottom-right', toastId: 'expired' },
      );
    }
  }, [isExpired]);

  useEffect(() => {
    if (!game) return;

    const guessedCardsCount = game.cards.filter((card) => card.number !== -1).length;
    dispatch(setAllCardsGuessed(false));
    dispatch(setGuessedCardsCount(guessedCardsCount));

    if (guessedCardsCount >= MAX_GUESSABLE_CARDS) {
      dispatch(setAllCardsGuessed(true));
    }
  }, [game]);

  if (loading && !isRefetching && !areAllCardsGuessed && !isExpired) {
    return (
      <div className="min-h-[50vh] flex-center">
        <Loading />
      </div>
    );
  }

  if (!isConnected) {
    redirect('/');
  }

  if (isEmpty(game) && !isCreated) {
    return <div className="text-white">There is no game with this id</div>;
  }

  return (
    <>
      {!isEmpty(game) && !areAllCardsGuessed && (
        <div className="px-1.5">
          <ProgressbarTimer
            duration={+game!.duration}
            initialTime={+game!.duration - timeLeftInSeconds(game!.createdAt)}
          />
        </div>
      )}

      <div className="flex flex-col gap-4">
        {areAllCardsGuessed || isExpired ? (
          <CreateRound
            title={isExpired ? 'This round has expired' : 'This round has ended'}
            desc="You can try out your luck again in a new round."
          />
        ) : (
          <CardDeck needsShuffling={isCreated} />
        )}
        <Board />
        <ActivityTab className="md:mt-16 mt-14" key={isRefetching ? 'refetch' : 'tab'} />
        <Toast />
      </div>
    </>
  );
};

export default Round;
