'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { Loading, ToastContent, ToastWrapper } from '@/components';
import { AppDispatch } from '@/redux/store';
import { getGame, setAllCardsGuessed, setGuessedCardsCount } from '@/redux/features/gameSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import isEmpty from '@/helpers/isEmpty';
import { MAX_GUESSABLE_CARDS } from '@/constants/static';

import CardDeck from '@/views/card/_components/CardDeck';
import Board from '@/views/card/_components/Board';
import Header from '@/views/card/_components/Header';

const ActivityTab = dynamic(() => import('./ActivityTab'));

const Game = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { isConnecting } = useTypedSelector((state) => state.account.profile);
  const {
    data: game,
    loading,
    isCreated,
    isExpired,
    isRefetching,
    areAllCardsGuessed,
  } = useTypedSelector((state) => state.game);
  const [needsShuffling, setNeedsShuffling] = useState(false);

  useEffect(() => {
    handleGameInitialization();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if ((!isEmpty(game) && game!.id === +id!) || (isEmpty(game) && !isCreated)) {
        clearInterval(interval);
        return;
      }

      handleGameInitialization();
    }, 500);

    return () => clearInterval(interval);
  }, [id, game, isCreated]);

  useEffect(() => {
    if (!game) return;

    const guessedCardsCount = game.cards.filter((card) => card.number !== -1).length;
    dispatch(setAllCardsGuessed(false));
    dispatch(setGuessedCardsCount(guessedCardsCount));

    if (guessedCardsCount >= MAX_GUESSABLE_CARDS) {
      dispatch(setAllCardsGuessed(true));
    }
  }, [game]);

  const handleGameInitialization = () => {
    setNeedsShuffling(false);
    dispatch(getGame(+id!))
      .unwrap()
      .then(() => {
        if (isCreated) {
          setNeedsShuffling(true);
          toast(
            <ToastWrapper>
              <ToastContent
                variant='neutral'
                title='Good luck!'
                description='You have successfully created the round.'
              />
            </ToastWrapper>,
            { position: 'bottom-right', toastId: 'welcome' },
          );
        }
      });
  };

  if (
    (isEmpty(game) && isConnecting) ||
    (loading && !isRefetching && !areAllCardsGuessed && !isExpired) ||
    (!isEmpty(game) && game!.id !== +id!)
  ) {
    return (
      <div className='min-h-[50vh] flex-center'>
        <Loading />
      </div>
    );
  }

  if (isEmpty(game) && !isCreated) {
    return (
      <div className='text-white text-center mx-auto py-20'>There is no game with this id</div>
    );
  }

  return (
    <>
      <Header showTitleInMobile={false} />

      <div className='flex flex-col gap-4 mt-8'>
        {isEmpty(game) ? (
          <div className='bg-gradiant-box rounded-lg md:px-8 px-1.5 pt-8 text-center card-deck-height' />
        ) : (
          <CardDeck needsShuffling={needsShuffling} />
        )}
        <Board />
        <ActivityTab className='md:mt-16 mt-14' />
      </div>
    </>
  );
};

export default Game;
