import { useState } from 'react';
import { motion } from 'framer-motion';

import CardSlides from './CardSlides';
import CardShuffling from './CardShuffling';

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
    <div className="overflow-hidden sm:bg-neutral-750 bg-transparent sm:mx-0 -mx-5 lg:px-7 md:px-2 px-0 pt-4 pb-5 rounded-lg">
      {showSlider ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <CardSlides isLoading={isLoading} slides={slides} />
        </motion.div>
      ) : (
        <CardShuffling cards={slides} onLoading={onLoading} setShowSlider={setShowSlider} />
      )}
    </div>
  );
};

export default PlayCards;
