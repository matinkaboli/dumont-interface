'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePrivy } from '@privy-io/react-auth';
import { redirect } from 'next/navigation';

import { Loading } from '@/components';
import { getPlayerGames } from '@/redux/features/accountSlice';
import { resetGame } from '@/redux/features/gameSlice';
import { AppDispatch } from '@/redux/store';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import isEmpty from '@/helpers/isEmpty';
import timeLeftInSeconds from '@/helpers/timeLeftInSeconds';
import Routes from '@/constants/routes';

import Board from '@/views/_components/Board';
import CardDeck from '@/views/_components/CardDeck';

const Home = () => {
  const { ready } = usePrivy();
  const dispatch = useDispatch<AppDispatch>();
  const {
    loading,
    profile: { address, isConnected, isConnecting },
  } = useTypedSelector((state) => state.account);
  const [activeRoundId, setActiveRoundId] = useState<string>('');
  const [isDecidingRedirect, setIsDecidingRedirect] = useState(true);

  useEffect(() => {
    if (address) handlePlayerGames(address);
  }, [address]);

  const handlePlayerGames = (addr: `0x${string}`) => {
    dispatch(resetGame());
    setActiveRoundId('');
    setIsDecidingRedirect(true);

    dispatch(getPlayerGames(addr))
      .unwrap()
      .then((games) => {
        if (isEmpty(games)) {
          setActiveRoundId('');
        } else {
          const game = games[0];
          const timeRemaining = +game.duration - timeLeftInSeconds(game.createdAt);
          if (timeRemaining > 0) setActiveRoundId(game.id);
        }
      })
      .finally(() => {
        setIsDecidingRedirect(false);
      });
  };

  if (
    loading ||
    !ready ||
    isConnecting ||
    ((isConnected || !isEmpty(address)) && isDecidingRedirect)
  )
    return (
      <div className="min-h-[50vh] flex-center">
        <Loading />
      </div>
    );

  if (isConnected || !isEmpty(address)) {
    if (activeRoundId) redirect(`${Routes.ROUND}/${activeRoundId}`);
    if (!activeRoundId) redirect(Routes.START);
  }

  return (
    <div className="flex flex-col gap-4">
      <CardDeck />
      <Board />
    </div>
  );
};

export default Home;
