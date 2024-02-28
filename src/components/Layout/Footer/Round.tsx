import clsx from 'clsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components';

interface Props {
  roundTime?: string;
}

const Round = ({ roundTime }: Props) => {
  const iconStyles = roundTime ? 'bg-primary-200' : 'bg-neutral-500';
  const textStyles = roundTime ? 'text-white' : 'text-neutral-200';
  const labelText = roundTime ? roundTime : 'There is no round';

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex-center-v gap-1">
            <div className={clsx('w-1.5 h-1.5 rounded-full', iconStyles)} />
            <div className={clsx('text-sm font-medium', textStyles)}>{labelText}</div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-48 !text-xs">
          Each round has an expiration time. After that it becomes inactive.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Round;
