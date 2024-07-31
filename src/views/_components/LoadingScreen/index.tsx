'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLenis } from '@studio-freight/react-lenis';

import Loading from '@/components/Loading';
import ProgressBar from '@/components/ProgressBar';
import { useLoading } from '@/contexts/LoadingContext';
import  useAssetLoading from '@/hooks/useAssetLoading';
import { useLottieContext } from '@/contexts/LottieContext';
import {homePageAssets} from '@/constants/general';

const overlayVariants = {
  enter: { y: '0%' },
  landing: {
    y: '-100%',
    transition: { duration: 0.8, delay: 2.2, ease: [0.455, 0.03, 0.515, 0.955] },
  },
  transitionEnd: { display: 'none' },
};

const LoadingScreen = () => {
  const lenis = useLenis();
  const [percent, setPercent] = useState(40);
  const { isLoading, setIsLoading } = useLoading();
  const { allAssetsLoaded } = useAssetLoading(homePageAssets);
  const { allAssetsLoaded: allLottieLoaded } = useLottieContext();

  useEffect(() => {
    if (allAssetsLoaded && allLottieLoaded) {
      setIsLoading(false);
    }
  }, [allAssetsLoaded, allLottieLoaded]);

  useEffect(() => {
    if (isLoading) {
      setPercent(40);
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      setPercent(100);
      document.body.style.overflow = 'visible';
      lenis?.start();
    }
  }, [isLoading]);


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
