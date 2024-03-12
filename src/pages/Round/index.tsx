'use client';

import { redirect } from 'next/navigation';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import CardDeck from '@/pages/_components/CardDeck';
import Board from '@/pages/_components/Board';

import ActivityTab from './ActivityTab';

const CreateRound = () => {
  const { isConfirmed } = useTypedSelector((state) => state.createRound);
  const { isConnected } = useTypedSelector((state) => state.account.profile);

  if (!isConnected || !isConfirmed) {
    redirect('/');
  }

  return (
    <div className="flex flex-col gap-4">
      <CardDeck />
      <Board />
      <ActivityTab className="md:mt-16 mt-14" />
    </div>
  );
};

export default CreateRound;
