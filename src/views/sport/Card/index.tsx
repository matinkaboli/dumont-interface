import Image from 'next/image';

import { Icon } from '@/components';
import ProgressBar from '@/views/sport/Card/ProgressBar';

const Card = () => {
  return (
    <div className="border-[1.5px] border-neutral-700 bg-neutral-800 rounded-lg w-full pt-4 pb-6 px-2">
      <div className="text-center text-xs text-neutral-400">Match time</div>
      <div className="text-center text-sm text-neutral-100 mt-0.5">23 Aug - 23:30</div>

      <h6 className="text-base text-white font-bold mt-3 whitespace-nowrap w-fit mx-auto">
        <span className="inline-flex gap-2 items-center">
          Real Madrid
          <Image width={0} height={0} className="h-6 w-auto" src="/images/real-madrid.svg" alt="" />
        </span>
        <span className="px-2">-</span>
        <span className="inline-flex gap-2 items-center">
          Barcelona
          <Image width={0} height={0} className="h-6 w-auto" src="/images/barcelona.svg" alt="" />
        </span>
      </h6>

      <div className="flex gap-1 items-center text-xs text-center text-neutral-400 w-fit mx-auto mt-3">
        <Icon name="ball" width="12" height="12" />
        Champions league
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <ProgressBar name="RMD" percentage={56} bgColor="white" />
        <ProgressBar name="DRAW" percentage={10} />
        <ProgressBar name="FCB" percentage={34} />
      </div>
    </div>
  );
};

export default Card;
