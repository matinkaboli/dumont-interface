'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { redirect } from 'next/navigation';
import { usePrivy } from '@privy-io/react-auth';

import { Loading } from '@/components';
import { getPlayerGames } from '@/redux/features/accountSlice';
import { resetGame } from '@/redux/features/gameSlice';
import { AppDispatch } from '@/redux/store';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Routes from '@/constants/routes';
import isEmpty from '@/helpers/isEmpty';

import Board from '@/views/_components/Board';
import CardDeck from '@/views/_components/CardDeck';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    loading,
    profile: { address },
  } = useTypedSelector((state) => state.account);
  const [activeRoundId, setActiveRoundId] = useState<string>('');
  const [isDecidingRedirect, setIsDecidingRedirect] = useState(true);
  const { ready } = usePrivy();

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
        setActiveRoundId(isEmpty(result) ? '' : result[0].id);
        setIsDecidingRedirect(false);
      });
  };

  if (loading || (!isEmpty(address) && isDecidingRedirect) || !ready)
    return (
      <div className="min-h-[50vh] flex-center">
        <Loading />
      </div>
    );

  if (!isEmpty(address)) {
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
