import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

import makeApiUrl from '@/helpers/makeApiUrl';
import getCardInfo from '@/helpers/getCardInfo';


import EmptyDataMessage from './EmptyDataMessage';

const Discarded = () => {
  const [discarded, setDiscarded] = useState<number[]>([]);
  const fetchDiscarded = async (id: string) => {
    try {
      const url = makeApiUrl(`games/${id}/cards`);
      const response = await axios.get(url);
      setDiscarded(response.data?.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDiscarded('34');
  }, []);

  return (
    <>
      {!discarded?.length ? (
        <EmptyDataMessage message="Nothing discarded" />
      ) : (
        <div className="md:bg-neutral-750 bg-transparent rounded-lg md:p-6 p-0">
          <h3 className="text-sm text-neutral-300">
            Here you can view the cards that have been <b>discarded</b> from the game, arranged in
            <span className="text-white"> numerical order.</span>
          </h3>

          <div className="flex flex-wrap md:gap-4 gap-3 mt-6">
            {discarded.map((discardedNumber) => (
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
  );
};

export default Discarded;
