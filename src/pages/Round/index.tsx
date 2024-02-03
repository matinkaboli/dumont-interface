'use client';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import CreateRound from './Create';
import KeyBoard from './KeyBoard';
import Amount from './Amount';
import Cards from './Cards';

const sectionHeight = 'md:min-h-[366px] min-h-[333px]';

const Round = () => {
  const isConfirmed = useTypedSelector((state) => state.createRound.isConfirmed);
  const address = useTypedSelector((state) => state.account.address);

  return (
    <div className="flex flex-col gap-4">
      {address && (
        <>
          {isConfirmed ? (
            <Cards className={sectionHeight} />
          ) : (
            <CreateRound className={sectionHeight} />
          )}
        </>
      )}

      {!address && <Cards className={sectionHeight} />}

      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-x-4 gap-x-0 md:gap-y-0 gap-y-4">
        <div className="col-span-2 md:order-1 order-2">
          <KeyBoard />
        </div>
        <div className="col-span-1 md:order-2 order-1">
          <Amount />
        </div>
      </div>
    </div>
  );
};

export default Round;
