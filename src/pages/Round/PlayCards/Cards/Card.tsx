import clsx from 'clsx';
import Image from 'next/image';

import { Skeleton } from '@/components';

interface Props {
  isActive: boolean;
  isLoading: boolean;
  index: number;
  slide: string;
}

const Card = ({ isActive, isLoading, index, slide }: Props) => {
  return (
    <div
      className={clsx(
        isActive ? 'scale-100' : 'scale-[calc(190/210)]',
        'transition-all duration-300 ease-linear transform rounded-2xl',
      )}
    >
      {isLoading ? (
        <Skeleton width={208} height={304} className="mx-auto" />
      ) : (
        <div className="fade-in animate-in duration-1000">
          <div
            className={clsx(
              isActive ? 'bg-primary-300' : '',
              'text-center p-1 font-bold text-base text-white w-28 h-28 rounded-full -mb-20 mx-auto',
            )}
          >
            {isActive && index}
          </div>

          <div
            className={clsx(
              isActive && 'bg-gradiant-slide p-1',
              'md:w-52 w-48 md:h-[298px] h-auto rounded-2xl flex items-center justify-center mx-auto',
            )}
          >
            <Image
              width={198}
              height={0}
              src={slide}
              className="mx-auto w-full h-full rounded-2xl"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
