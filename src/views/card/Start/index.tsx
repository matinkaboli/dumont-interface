'use client';

import { Loading } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import Board from '@/views/card/_components/Board';
import CreateRound from '@/views/card/_components/CreateRound';

const Start = () => {
  const {
    loading,
    profile: { isConnected },
  } = useTypedSelector((state) => state.account);

  if (loading)
    return (
      <div className="min-h-[50vh] flex-center">
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <CreateRound />

      <div className={isConnected ? 'md:block hidden' : ''}>
        <Board />
      </div>
    </div>
  );
};

export default Start;
