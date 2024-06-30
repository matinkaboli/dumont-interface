import Image from 'next/image';

import makeApiUrl from '@/helpers/makeApiUrl';
import getCardInfo from '@/helpers/getCardInfo';
import useAxiosGet from '@/hooks/useAxiosGet';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import EmptyDataMessage from './EmptyDataMessage';

const Discarded = () => {
  const { data: game } = useTypedSelector((state) => state.game);
  const { data: discarded, loading } = useAxiosGet<number[]>(makeApiUrl(`games/${game?.id}/cards`));

  return (
    <>
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <>
          {discarded?.length === 0 ? (
            <EmptyDataMessage message="Nothing discarded" />
          ) : (
            <div className="md:bg-neutral-750 bg-transparent rounded-lg md:p-6 p-0">
              <h3 className="text-sm text-neutral-300">
                Here you can view the cards that have been <b>discarded</b> from the game, arranged
                in
                <span className="text-white"> numerical order.</span>
              </h3>

              <div className="flex flex-wrap md:gap-4 gap-3 mt-6">
                {discarded?.map((discardedNumber) => (
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
