'use client';

import clsx from 'clsx';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components';

import Round from './Round';

const Footer = ({ className }: { className?: string }) => {
  const isConfirmed = useTypedSelector((state) => state.createRound.isConfirmed);

  return (
    <footer className={clsx('md:flex hidden justify-center items-center', className)}>
      {isConfirmed ? (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Round roundTime="2h 20m 12s" />
            </TooltipTrigger>
            <TooltipContent className="w-48 !text-xs">
              Each round has an expiration time. After that it becomes inactive.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Round />
      )}
    </footer>
  );
};

export default Footer;
