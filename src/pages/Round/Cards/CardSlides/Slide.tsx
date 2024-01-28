import clsx from 'clsx';
import Image from 'next/image';

import { cardSizeStyles } from '../.';

interface Props {
  isActive: boolean;
  index: number;
  slide: string;
}

const circleSize = 112;

const Slide = ({ isActive, index, slide }: Props) => {
  const scaleClass = isActive ? 'scale-100' : 'scale-[calc(190/210)]';
  const circleStyle = {
    width: `${circleSize}px`,
    height: `${circleSize}px`,
  };

  return (
    <div className={clsx(scaleClass, 'transition-all duration-300 ease-linear transform')}>
      <div className="fade-in animate-in duration-1000">
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
            cardSizeStyles.width.card,
            cardSizeStyles.height.card,
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
    </div>
  );
};
export default Slide;
