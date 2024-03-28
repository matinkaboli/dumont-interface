'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components';

const circleSize = 12;

const transition = {
  duration: 30,
  delay: 0.5,
  ease: 'easeInOut',
};

const progressVariants = {
  enter: {
    width: '100%',
    transition: {
      delay: 0,
      duration: 0,
    },
  },
  animate: {
    width: 0,
    transition,
  },
};

const circleVariants = {
  enter: {
    transition: {
      delay: 0,
      duration: 0,
    },
  },
  animate: {
    right: 0, // Start position
    left: 0, // End position
    transition,
  },
};

const ProgressbarTimer = () => {
  const [isHovered, setIsHovered] = useState(false);

  const showTooltip = () => setIsHovered(true);
  const hideTooltip = () => setIsHovered(false);

  return (
    <div className="relative cursor-pointer" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      <div className="h-0.5 rounded-xl w-full bg-neutral-500 overflow-hidden">
        <motion.div
          variants={progressVariants}
          initial="enter"
          animate="animate"
          exit="enter"
          className={clsx(
            'absolute top-0 left-0 w-full rounded-xl bg-primary-300 transition-height ease-in-out duration-150',
            isHovered ? 'h-[3px]' : 'h-0.5',
          )}
        />
      </div>

      <TooltipProvider delayDuration={100}>
        <Tooltip open={isHovered}>
          <TooltipTrigger asChild>
            <motion.div
              variants={circleVariants}
              initial="enter"
              animate="animate"
              exit="enter"
              className="absolute right-0 h-full rounded-full bg-primary-250"
              style={{
                width: circleSize,
                height: circleSize,
                top: -(circleSize / 2),
              }}
            />
          </TooltipTrigger>

          <TooltipContent className="text-sm font-medium flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-250" />
            <span className="text-primary-250">2h 20m 12s</span>
            <span className="text-neutral-300">has left</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ProgressbarTimer;
