'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePrivy } from '@privy-io/react-auth';
import { redirect } from 'next/navigation';

import { Loading } from '@/components';
import { getPlayerGames } from '@/redux/features/accountSlice';
import { resetGame } from '@/redux/features/faro/faroSlice';
import { AppDispatch } from '@/redux/store';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import isEmpty from '@/helpers/isEmpty';
import timeLeftInSeconds from '@/helpers/timeLeftInSeconds';
import Routes from '@/constants/routes';
import { FARO_DURATION } from '@/constants/static';

import Board from '@/views/card/_components/Board';
import CardDeck from '@/views/card/_components/CardDeck';
import Header from '@/views/card/_components/Header';

const Main = () => {
  const { ready, user } = usePrivy();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useTypedSelector((state) => state.account);
  const [activeRoundId, setActiveRoundId] = useState<number | null>(null);
  const [isDecidingRedirect, setIsDecidingRedirect] = useState(true);
  const address = user?.smartWallet?.address;

  useEffect(() => {
    if (address) handlePlayerGames(address as `0x${string}`);
  }, [address]);

  const handlePlayerGames = (addr: `0x${string}`) => {
    dispatch(resetGame());
    setActiveRoundId(null);
    setIsDecidingRedirect(true);

    dispatch(getPlayerGames(addr))
      .unwrap()
      .then((games) => {
        if (isEmpty(games)) {
          setActiveRoundId(null);
        } else {
          const game = games[0];
          const timeRemaining = FARO_DURATION - timeLeftInSeconds(game.createdAt);
          if (timeRemaining > 0) setActiveRoundId(game.id);
        }
      })
      .finally(() => {
        setIsDecidingRedirect(false);
      });
  };

  if (loading || !ready || (!isEmpty(address) && isDecidingRedirect))
    return (
      <div className='min-h-[50vh] flex-center'>
        <Loading />
      </div>
    );

  if (!isEmpty(address)) {
    if (activeRoundId) redirect(`${Routes.CARDS}/${activeRoundId}`);
    // if (!activeRoundId) redirect(Routes.CARDS);
  }

  return (
    <>
      <Header />

      <div className='flex flex-col gap-4 sm:mt-8 mt-4'>
        <CardDeck />
        <Board />
      </div>
    </>
  );
};

export default Main;
