import clsx from 'clsx';

import getCardInfo from '@/helpers/getCardInfo';

import FlipImage from './FlipImage';
import { cardSizeStyles } from '../../.';

const circleSize = 112;

interface Props {
  isActive: boolean;
  index: number;
  slide: string;
  isLeaked?: boolean;
  number?: number;
}

const Slide = ({ isActive, index, slide, number = -1 }: Props) => {
  return (
    <div
      className={clsx(
        isActive ? 'scale-100' : 'scale-[calc(190/210)]',
        'transition-all duration-300 ease-linear transform',
      )}
    >
      <div className="fade-in animate-in duration-1000">
        <div
          className={clsx(
            isActive ? 'bg-primary-300' : '',
            'text-center p-1 font-bold text-base text-white rounded-full -mb-20 mx-auto',
          )}
          style={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
          }}
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
          <FlipImage
            frontSrc={slide}
            backSrc={number !== -1 ? `/images/cards/${getCardInfo(number)}.png` : '/images/card.png'}
            isRevealed={number !== -1}
          />
        </div>
      </div>
    </div>
  );
};
export default Slide;
