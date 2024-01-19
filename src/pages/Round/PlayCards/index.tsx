import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Slider from '@/components/Slider';

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
    <div className="bg-neutral-750 min-h-[360px] px-7 pt-4 pb-5 rounded-lg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Slider isLoading={isLoading} />
      </motion.div>
    </div>
  );
};

export default PlayCards;
