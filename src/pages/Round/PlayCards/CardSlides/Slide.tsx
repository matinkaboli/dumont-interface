import clsx from 'clsx';
import Image from 'next/image';

import { Skeleton } from '@/components';

interface Props {
  isActive: boolean;
  isLoading: boolean;
  index: number;
  slide: string;
}

const circleSize = 112;
const cardWidthClass = 'md:!w-52 !w-48';
const cardHeight = 'md:h-[298px] h-[265px]';
const cardSkeletonHeight = 'md:!h-[290px] !h-[265px]'; // The skeleton height should be 8 pixels less than the card height due to padding.

const parentTransitionClass = 'transition-all duration-300 ease-linear transform';
const fadeAndAnimateClass = 'fade-in animate-in duration-1000';

const Slide = ({ isActive, isLoading, index, slide }: Props) => {
  const scaleClass = isActive ? 'scale-100' : 'scale-[calc(190/210)]';
  const circleStyle = {
    width: `${circleSize}px`,
    height: `${circleSize}px`,
  };

  return (
    <div className={clsx(scaleClass, parentTransitionClass)}>
      {isLoading ? (
        <div className="text-center">
          <Skeleton
            circle
            width={circleSize}
            height={circleSize}
            baseColor={isActive ? '#ebebeb' : 'transparent'}
            highlightColor={isActive ? '#f5f5f5' : 'transparent'}
            className="!-mb-20"
          />
          <Skeleton
            width={0}
            height={0}
            borderRadius={16}
            className={clsx(cardWidthClass, cardSkeletonHeight)}
          />
        </div>
      ) : (
        <div className={fadeAndAnimateClass}>
          <div
            style={circleStyle}
            className={clsx(
              isActive ? 'bg-primary-300' : '',
              'text-center p-1 font-bold text-base text-white rounded-full -mb-20 mx-auto',
            )}
          >
            {isActive && index}
          </div>

          <div
            className={clsx(
              cardWidthClass,
              cardHeight,
              isActive && 'bg-gradiant-slide p-1',
              'rounded-2xl flex items-center justify-center mx-auto',
            )}
          >
            <Image
              width={200}
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
export default Slide;
