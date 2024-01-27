import { useState } from 'react';

import CardSlides from './CardSlides';
import CardShuffling from './CardShuffling';

export const cardSizeStyles = {
  height: {
    card: 'md:h-[298px] h-[265px]',
    skeleton: 'md:!h-[290px] !h-[257px]', // The skeleton height should be 8 pixels less than the card height due to padding.
    fakeCard: 'md:h-[290px] h-[257px]', // Same as skeleton.
  },
  width: {
    card: 'md:w-52 w-48',
    skeleton: 'md:!w-52 !w-48',
    fakeCard: 'md:w-[200px] w-[184px]',
  }
}

const imgSrc = '/images/full-card.png';
const slides = Array.from({ length: 8 }, () => imgSrc);

const PlayCards = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSlider, setShowSlider] = useState(false);

  const onLoading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="md:min-h-[366px] min-h-[333px] overflow-hidden sm:bg-neutral-750 bg-transparent sm:mx-0 -mx-5 lg:px-7 md:px-2 px-0 pt-4 pb-5 rounded-lg">
      {showSlider ? (
        <div className="fade-in animate-in duration-1000">
          <CardSlides isLoading={isLoading} slides={slides} />
        </div>
      ) : (
        <CardShuffling cards={slides} onLoading={onLoading} setShowSlider={setShowSlider} />
      )}
    </div>
  );
};

export default PlayCards;
