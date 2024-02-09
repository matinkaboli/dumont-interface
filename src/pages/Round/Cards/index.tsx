'use client';

import { useState } from 'react';
import clsx from 'clsx';

import CardSlides from './CardSlides';
import CardShuffling from './CardShuffling';

export const cardSizeStyles = {
  height: {
    card: 'md:h-[298px] h-[265px]',
    fakeCard: 'md:h-[290px] h-[257px]', // The fakeCard height should be 8 pixels less than the card height due to padding.
  },
  width: {
    card: 'md:w-52 w-48',
    fakeCard: 'md:w-[200px] w-[184px]',
  },
};

export interface SlideSrc {
  id: number;
  src: string;
}

const imgSrc = '/images/card.png';
const cards = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  src: imgSrc,
}));
const slides = [{ id: 10, src: '/images/card-placeholder.png' }, ...cards];

const PlayCards = ({ className = '' }: { className?: string }) => {
  const [showSlider, setShowSlider] = useState(false);

  return (
    <div
      className={clsx(
        'overflow-hidden sm:bg-neutral-750 bg-transparent sm:mx-0 -mx-5 lg:px-7 md:px-2 px-0 pt-4 pb-5 rounded-lg',
        className,
      )}
    >
      {showSlider ? (
        <div className="fade-in animate-in duration-1000">
          <CardSlides slides={slides} />
        </div>
      ) : (
        <CardShuffling cards={cards} setShowSlider={setShowSlider} />
      )}
    </div>
  );
};

export default PlayCards;
