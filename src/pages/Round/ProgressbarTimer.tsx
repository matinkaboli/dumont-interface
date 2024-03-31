'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components';

const circleSize = 12;
// const defaultTimerSeconds = 12 * 60 * 60; // 12 hours in seconds
const defaultTimerSeconds = 30;

const transition = {
  duration: defaultTimerSeconds,
  delay: 0.5,
};

const progressVariants = {
  enter: { width: '100%' },
  animate: {
    width: 0,
    transition,
  },
};

const circleVariants = {
  animate: {
    right: 0, // Start position
    left: 0, // End position
    transition,
  },
};

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  let timeString = '';

  if (hours > 0) timeString += `${hours}h `;

  if (minutes > 0 || hours > 0) timeString += `${minutes}m `;

  if (seconds > 0 || (hours === 0 && minutes === 0)) timeString += `${seconds}s `;

  return timeString.trim() || 'There is no time';
};

const ProgressbarTimer = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [remainingTime, setRemainingTime] = useState(defaultTimerSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    if (remainingTime <= -1) {
      clearInterval(timer);
      console.log('Timer expired!');
    }

    return () => clearInterval(timer);
  }, [remainingTime]);

  const showTooltip = () => setIsHovered(true);
  const hideTooltip = () => setIsHovered(false);

  const formattedTime = useMemo(() => formatTime(remainingTime), [remainingTime]);

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
              animate="animate"
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
            <span className={remainingTime <= -1 ? 'text-neutral-300' : 'text-primary-250'}>
              {formattedTime}
            </span>
            <span className="text-neutral-300">has left</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ProgressbarTimer;
