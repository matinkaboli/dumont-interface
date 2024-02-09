'use client';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import CreateRound from './Create';
import Cards from './Cards';
import Board from './Board';

const sectionHeight = 'md:min-h-[366px] min-h-[333px]';

const Round = () => {
  const isConfirmed = useTypedSelector((state) => state.createRound.isConfirmed);
  const { isConnected, isConnecting } = useTypedSelector((state) => state.account.profile);

  if (isConnecting) return <div className="text-center text-white mt-16">Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      {!isConnected || isConfirmed ? (
        <Cards className={sectionHeight} />
      ) : (
        <CreateRound className={sectionHeight} />
      )}

      {isConnected && !isConfirmed && (
        <div className="md:block hidden">
          <Board />
        </div>
      )}

      {((isConnected && isConfirmed) || !isConnected) && <Board />}
    </div>
  );
};

export default Round;
