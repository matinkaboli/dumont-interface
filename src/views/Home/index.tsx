'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { redirect } from 'next/navigation';

import { Loading } from '@/components';
import { getPlayerGames, redirectPlayer } from '@/redux/features/accountSlice';
import { resetGame } from '@/redux/features/gameSlice';
import { AppDispatch } from '@/redux/store';
import timeLeftInSeconds from '@/helpers/timeLeftInSeconds';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Routes from '@/constants/routes';

import Board from '@/views/_components/Board';
import CardDeck from '@/views/_components/CardDeck';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    loading,
    isRedirected,
    profile: { isConnected, address, isConnecting },
  } = useTypedSelector((state) => state.account);
  const [activeRoundId, setActiveRoundId] = useState<string>('');
  const [isDecidingRedirect, setIsDecidingRedirect] = useState(true);

  useEffect(() => {
    if (address) handlePlayerGames(address);
  }, [address]);

  const handlePlayerGames = (addr: `0x${string}`) => {
    dispatch(resetGame());
    setIsDecidingRedirect(true);
    setActiveRoundId('');

    dispatch(getPlayerGames(addr))
      .unwrap()
      .then((result) => {
        const timeLeft = +result[0]?.duration - timeLeftInSeconds(result[0]?.createdAt);

        if (timeLeft > 0 && !isRedirected) {
          setActiveRoundId(result[0].id);
        } else {
          setActiveRoundId('');
        }

        setIsDecidingRedirect(false);
      })
      .finally(() => {
        dispatch(redirectPlayer(true));
      });
  };

  if (isConnecting || loading || (isConnected && isDecidingRedirect))
    return (
      <div className="min-h-[50vh] flex-center">
        <Loading />
      </div>
    );

  if (isConnected) {
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
