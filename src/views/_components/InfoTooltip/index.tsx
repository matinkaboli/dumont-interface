import { Icon, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components';

interface Props {
  label?: string;
  tooltipText?: string;
  className?: string;
}

const InfoTooltip = ({ label, tooltipText, className }: Props) => {
  return (
    <div className="flex items-center gap-0.5">
      <div className={className}>{label}</div>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger>
            <Icon name="circle-exclamation-fill" />
          </TooltipTrigger>
          <TooltipContent>{tooltipText}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default InfoTooltip;
