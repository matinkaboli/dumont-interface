import { ReactNode } from 'react';

import { Icon, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components';

interface Props {
  label?: string | ReactNode;
  tooltipText?: string;
  className?: string;
  bgColor?: string;
}

const InfoTooltip = ({ label, tooltipText, className, bgColor = '#252525' }: Props) => {
  return (
    <div className="flex items-center gap-0.5">
      <div className={className}>{label}</div>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger onFocus={(event) => event.preventDefault()}>
            <Icon name="circle-exclamation-fill" color="#75757C" />
          </TooltipTrigger>
          <TooltipContent bgColor={bgColor}>{tooltipText}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default InfoTooltip;
