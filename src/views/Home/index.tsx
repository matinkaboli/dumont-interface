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
import CreateRound from '@/views/_components/CreateRound';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    profile: { isConnected, address, isConnecting },
    isRedirected,
    loading,
  } = useTypedSelector((state) => state.account);
  const [redirectId, setRedirectId] = useState<string>('');

  useEffect(() => {
    if (address) handlePlayerGames(address);
  }, [address, isConnecting]);

  const handlePlayerGames = (addr: `0x${string}`) => {
    dispatch(resetGame());
    setRedirectId('');

    dispatch(getPlayerGames(addr))
      .unwrap()
      .then((result) => {
        const timeLeft = +result[0]?.duration - timeLeftInSeconds(result[0]?.createdAt);

        if (timeLeft > 0 && !isRedirected) {
          setRedirectId(result[0].id);
        } else {
          setRedirectId('');
        }
      })
      .finally(() => {
        dispatch(redirectPlayer(true));
      });
  };

  if (loading)
    return (
      <div className="min-h-[50vh] flex-center">
        <Loading />
      </div>
    );

  if (redirectId) redirect(`${Routes.ROUND}/${redirectId}`);

  return (
    <div className="flex flex-col gap-4">
      {isConnected ? <CreateRound /> : <CardDeck />}

      <div className={isConnected ? 'md:block hidden' : ''}>
        <Board />
      </div>
    </div>
  );
};

export default Home;
