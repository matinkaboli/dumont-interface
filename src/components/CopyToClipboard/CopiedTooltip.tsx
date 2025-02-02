import { ReactNode } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components';

interface Props {
  children: ReactNode;
  isCopied: boolean;
}

const CopiedTooltip = ({ children, isCopied }: Props) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip open={isCopied}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent bgColor="#3B3A45">Copied!</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopiedTooltip;
