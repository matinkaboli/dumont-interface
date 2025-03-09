import clsx from 'clsx';

interface Props {
  className?: string;
  percentage?: number;
  name: string;
  bgColor?: string;
  labelClassName?: string;
  roundedFull?: boolean;
}

const ProgressBar = ({
  name,
  className,
  labelClassName,
  percentage = 100,
  bgColor = '#3B3A45',
  roundedFull = false,
}: Props) => {
  return (
    <div className={className} style={{ width: `${percentage}%` }}>
      <div
        className={clsx('w-full h-3', roundedFull ? 'rounded-xl' : 'rounded-r-xl')}
        style={{ backgroundColor: bgColor }}
      />
      <div className={clsx('sm:text-xs text-sm mt-1 whitespace-nowrap', labelClassName)}>
        <span className="text-white font-medium">{percentage}% </span>
        <span className="text-neutral-400">{name}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
