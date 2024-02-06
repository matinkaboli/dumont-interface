'use client';

import { useAccount } from 'wagmi';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useScreenDetector } from '@/hooks/useScreenDetector';

import CreateRound from './Create';
import Cards from './Cards';
import Board from './Board';

const sectionHeight = 'md:min-h-[366px] min-h-[333px]';

const Round = () => {
  const isConfirmed = useTypedSelector((state) => state.createRound.isConfirmed);
  const { isConnected, isConnecting } = useAccount();
  const { isMobile } = useScreenDetector();

  if (isConnecting) return null;

  return (
    <div className="flex flex-col gap-4">
      {!isConnected || isConfirmed ? (
        <Cards className={sectionHeight} />
      ) : (
        <CreateRound className={sectionHeight} />
      )}
      {isConnected && !isConfirmed && isMobile ? null : <Board />}
    </div>
  );
};

export default Round;
