import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Slider from '@/components/Slider';

const imgSrc = '/images/full-card.png';
const imgShowSrc = '/images/card-show.png';

const slides = [imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgSrc, imgShowSrc];


const PlayCards = () => {
  const [isLoading, setIsLoading] = useState(true);

  const onLoading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    onLoading();
  }, []);

  return (
    <div className="md:bg-neutral-750 bg-transparent min-h-[360px] md:mx-0 -mx-5 md:px-7 px-0 pt-4 pb-5 rounded-lg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Slider isLoading={isLoading} slides={slides} />
      </motion.div>
    </div>
  );
};

export default PlayCards;
