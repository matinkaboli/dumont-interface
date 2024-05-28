'use client';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import Board from '@/views/_components/Board';
import CardDeck from '@/views/_components/CardDeck';

import CreateRound from './Create';

const Home = () => {
  const { isConnected, isConnecting } = useTypedSelector((state) => state.account.profile);

  if (isConnecting) return <div className="text-center text-white mt-16">Loading...</div>;

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
