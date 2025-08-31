import clsx from 'clsx';

interface Props {
  className?: string;
  percentage?: number;
  name: string;
  bgColor?: string;
  labelClassName?: string;
  roundedFull?: boolean;
  displayTextOrder?: 'default' | 'reverse';
  showShortNameInMobile?: boolean;
}

const percentageStyle = 'text-white font-medium';

const ProgressBar = (
  {
    name,
    className,
    labelClassName,
    percentage = 100,
    bgColor = '#3B3A45',
    roundedFull = false,
    displayTextOrder = 'default',
    showShortNameInMobile = true,
  }: Props) => {
  const labelPosition = displayTextOrder === 'reverse' ? '-top-5' : '-bottom-5 mt-1';

  return (
    <div className={clsx('relative h-5 flex items-center mb-4', className)} style={{ width: `${percentage}%` }}>
      {/* Progress Fill */}
      <div
        style={{ backgroundColor: bgColor }}
        className={clsx('w-full h-3', roundedFull ? 'rounded-xl' : 'rounded-r-xl')}
      />

      {/* Label */}
      <div className={clsx('absolute sm:text-xs text-sm whitespace-nowrap', labelPosition, labelClassName)}>
        <span className={clsx(showShortNameInMobile ? '' : 'hidden sm:inline', percentageStyle)}>
          {percentage}%
        </span>
        {!showShortNameInMobile &&
          <span className={clsx('inline sm:hidden', percentageStyle)}>
            {percentage?.toFixed(0)}%
          </span>
        }
        <span className={clsx(
          'text-neutral-400 pl-0.5',
          showShortNameInMobile ? '' : 'sm:inline-block hidden',
        )}>
          {name}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
