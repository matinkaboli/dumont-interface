'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useLoadingStore } from '@/stores/loadingStore';
import Loading from '@/components/Loading';
import ProgressBar from '@/components/ProgressBar';

const overlayVariants = {
  enter: { y: '0%' },
  landing: {
    y: '-100%',
    transition: { duration: 0.8, delay: 2.2, ease: [0.455, 0.03, 0.515, 0.955] },
  },
  transitionEnd: { display: 'none' },
};


const LoadingScreen = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const [percent, setPercent] = useState(40);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      setPercent(100);
    } else {
      if (percent === 40) {
        const timeout = setTimeout(() => setPercent(70), 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [isLoading, percent]);

  return (
    <motion.div
      data-lenis-prevent
      initial='enter'
      animate={isLoading ? '' : 'landing'}
    >
      <motion.div
        variants={overlayVariants}
        className='bg-neutral-800 h-screen flex items-center justify-center fixed inset-0 z-50'
      >
        <div className='flex flex-col items-center gap-12'>
          <Loading />
          <ProgressBar percents={percent} barWidth={214} barHeight={3} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
