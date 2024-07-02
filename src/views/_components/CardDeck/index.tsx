'use client';

import { useState } from 'react';
import clsx from 'clsx';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Card } from '@/redux/features/gameSlice';

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

const demoCards: Card[] = Array.from({ length: 18 }, (_, index) => ({
  number: -1,
  hash: `hash_${index + 1}`,
  isFreeReveal: false,
  guessedNumbers: [],
  status: 'hidden',
  _id: `id_${index + 1}`,
}));

const PlayCards = ({
  className = '',
  needsShuffling = true,
}: {
  className?: string;
  needsShuffling?: boolean;
}) => {
  const [showSlider, setShowSlider] = useState(false);
  const { data: game } = useTypedSelector((state) => state.game);
  const { isConnected } = useTypedSelector((state) => state.account.profile);

  return (
    <div
      className={clsx(
        'overflow-hidden sm:bg-neutral-750 bg-transparent sm:mx-0 -mx-5 lg:px-7 md:px-2 px-0 pt-4 pb-5 rounded-lg card-deck-height',
        className,
      )}
    >
      {needsShuffling ? (
        <>
          {showSlider ? (
            <div className="fade-in animate-in duration-1000">
              <CardSlides slides={isConnected ? game?.cards : demoCards} />
            </div>
          ) : (
            <CardShuffling cards={demoCards} setShowSlider={setShowSlider} />
          )}
        </>
      ) : (
        <div className="fade-in animate-in duration-1000">
          <CardSlides slides={isConnected ? game?.cards : demoCards} />
        </div>
      )}
    </div>
  );
};

export default PlayCards;
