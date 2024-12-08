'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import clsx from 'clsx';

import { ToastContent, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components';
import { AppDispatch } from '@/redux/store';
import { expireGame } from '@/redux/features/gameSlice';
import formatDurationFromSeconds from '@/helpers/formatDurationFromSeconds';

const circleSize = 12;

const ProgressbarTimer = ({ duration, initialTime }: { duration: number; initialTime: number }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isHovered, setIsHovered] = useState(false);
  const [remainingTime, setRemainingTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    if (remainingTime <= -1) {
      clearInterval(timer);
      dispatch(expireGame(true));
      toast(
        <ToastContent variant="neutral" title="Expired!" description="Your game has expired." />,
        { position: 'bottom-right', toastId: 'expired' },
      );
    }

    return () => clearInterval(timer);
  }, [remainingTime]);

  const showTooltip = () => setIsHovered(true);
  const hideTooltip = () => setIsHovered(false);

  const progressBarWidth = useMemo(() => {
    return initialTime <= 0 ? 0 : (remainingTime / duration) * 100;
  }, [initialTime, remainingTime, duration]);

  return (
    <div className="relative cursor-pointer" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      <div className="h-0.5 rounded-xl w-full bg-neutral-500 overflow-hidden">
        <motion.div
          initial={{ width: `${progressBarWidth}%` }}
          animate={{ width: '0%' }}
          transition={{ duration: initialTime }}
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
              initial={{ right: `${100 - progressBarWidth}%` }}
              animate={{ right: '100%' }}
              transition={{ duration: initialTime }}
              className="absolute h-full rounded-full bg-primary-250 -mr-3"
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
              {formatDurationFromSeconds(remainingTime)}
            </span>
            <span className="text-neutral-300">has left</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ProgressbarTimer;
