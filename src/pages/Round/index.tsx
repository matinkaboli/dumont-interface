'use client';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useScreenDetector } from '@/hooks/useScreenDetector';

import CreateRound from './Create';
import Cards from './Cards';
import Board from './Board';

const sectionHeight = 'md:min-h-[366px] min-h-[333px]';

const Round = () => {
  const isConfirmed = useTypedSelector((state) => state.createRound.isConfirmed);
  const address = useTypedSelector((state) => state.account.address);
  const { isMobile } = useScreenDetector();

  return (
    <div className="flex flex-col gap-4">
      {!address || isConfirmed ? (
        <Cards className={sectionHeight} />
      ) : (
        <CreateRound className={sectionHeight} />
      )}
      {address && !isConfirmed && isMobile ? null : <Board />}
    </div>
  );
};

export default Round;
