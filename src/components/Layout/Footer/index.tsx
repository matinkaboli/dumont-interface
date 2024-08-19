'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import formatDurationFromSeconds from '@/helpers/formatDurationFromSeconds';
import timeLeftInSeconds from '@/helpers/timeLeftInSeconds';
import isEmpty from '@/helpers/isEmpty';

import Round from './Round';

const formatTime = (duration: string, createdAt: Date) => {
  const time = +duration - timeLeftInSeconds(createdAt);
  if (time <= 0) {
    return 'There is no time';
  }

  return formatDurationFromSeconds(time);
};

const Footer = ({ className }: { className?: string }) => {
  const { data: game } = useTypedSelector((state) => state.game);
  const { isConnected } = useTypedSelector((state) => state.account.profile);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    if (!isEmpty(game)) {
      const updateFormattedTime = () => {
        setCurrentTime(formatTime(game!.duration, game!.createdAt));
      };

      updateFormattedTime();

      const intervalId = setInterval(updateFormattedTime, 1000);

      return () => clearInterval(intervalId);
    }
  }, [game]);

  if (!isConnected) return null;

  return (
    <footer className={clsx('md:flex hidden justify-center items-center', className)}>
      {isEmpty(game) ? (
        <Round />
      ) : (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Round roundTime={currentTime} />
            </TooltipTrigger>
            <TooltipContent className="w-48 !text-xs">
              Each round has an expiration time. After that it becomes inactive.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </footer>
  );
};

export default Footer;
