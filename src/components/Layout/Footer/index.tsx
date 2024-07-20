'use client';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import clsx from 'clsx';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import timeLeftInSeconds from '@/helpers/timeLeftInSeconds';
import isEmpty from '@/helpers/isEmpty';

import Round from './Round';

dayjs.extend(duration);

const formattedTime = (duration: string, createdAt: Date) => {
  const time = +duration - timeLeftInSeconds(createdAt);
  return dayjs.duration(time, 'seconds').format('H[h] m[m] s[s]');
};

const Footer = ({ className }: { className?: string }) => {
  const { data: game } = useTypedSelector((state) => state.game);

  return (
    <footer className={clsx('md:flex hidden justify-center items-center', className)}>
      {isEmpty(game) ? (
        <Round />
      ) : (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Round roundTime={formattedTime(game!.duration, game!.createdAt)} />
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
