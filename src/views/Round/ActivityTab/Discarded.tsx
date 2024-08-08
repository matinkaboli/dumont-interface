import Image from 'next/image';
import { useMemo } from 'react';

import { Loading } from '@/components';
import getCardInfo from '@/helpers/getCardInfo';
import useAxiosGet from '@/hooks/useAxiosGet';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import isEmpty from '@/helpers/isEmpty';

import EmptyDataMessage from './EmptyDataMessage';

const Discarded = () => {
  const { data: game } = useTypedSelector((state) => state.game);
  const { data: discarded, loading } = useAxiosGet<number[]>(`games/${game?.id}/cards`);

  const sortedDiscarded = useMemo(() => {
    return discarded?.sort((a, b) => (a % 13) - (b % 13)) || [];
  }, [discarded]);

  return (
    <>
      {loading ? (
        <div className="flex-center mt-14 mb-10">
          <Loading size={32} />
        </div>
      ) : (
        <>
          {isEmpty(discarded) ? (
            <EmptyDataMessage message="Nothing discarded" />
          ) : (
            <div className="md:bg-neutral-750 bg-transparent rounded-lg md:p-6 p-0">
              <h3 className="text-sm text-neutral-300">
                Here you can view the cards that have been <b>discarded</b> from the game, arranged
                in
                <span className="text-white"> numerical order.</span>
              </h3>

              <div className="flex flex-wrap md:gap-4 gap-3 mt-6">
                {sortedDiscarded?.map((discardedNumber) => (
                  <Image
                    key={discardedNumber}
                    src={`/images/cards/${getCardInfo(discardedNumber)}.png`}
                    width={99}
                    height={138}
                    className="md:w-[99px] sm:w-[105px] w-[30%] h-auto rounded-lg"
                    alt=""
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Discarded;
