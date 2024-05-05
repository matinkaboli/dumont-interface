'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

interface Props {
  percents: number;
  duration?: number;
  delay?: number;
  barWidth?: number;
  barHeight?: number;
  progressColor?: string;
  baseColor?: string;
  className?: string;
}

const ProgressBar = (
  {
    percents,
    duration = 3,
    delay = 0,
    barWidth = 300,
    barHeight = 4,
    progressColor = '#EA00FF',
    baseColor = '#4B405A',
    className,
  }: Props) => {
  const percentsOffset = (percents - 100) * (barWidth / 100);

  const transition = {
    duration: duration,
    delay: delay,
    ease: 'easeInOut',
  };

  const variants = {
    enter: {
      x: -barWidth,
    },
    animate: {
      x: [-barWidth, percentsOffset],
      transition,
    },
  };

  return (
    <div className={clsx('flex', className)}>
      <div
        className='relative rounded-lg w-full h-10 bg-gray-200 overflow-hidden'
        style={{ width: barWidth, height: barHeight, backgroundColor: baseColor }}>
        <motion.div
          variants={variants}
          initial='enter'
          animate='animate'
          exit='enter'
          className='absolute inset-0 w-full h-full'
          style={{ backgroundColor: progressColor }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
