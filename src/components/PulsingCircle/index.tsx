import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const pulsingCircleVariants = cva('rounded-full', {
  variants: {
    size: {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-3 h-3',
    },
    color: {
      primary: 'bg-primary-600',
      success: 'bg-success-600',
      warning: 'bg-warning-600',
      danger: 'bg-error-600',
      neutral: 'bg-neutral-500',
      custom: '',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'success',
  },
});

interface PulsingCircleProps extends VariantProps<typeof pulsingCircleVariants> {
  className?: string;
  customColor?: string;
}

export default function PulsingCircle({ size, color, className, customColor }: PulsingCircleProps) {
  return (
    <div className={className}>
      <div className="relative flex-center ">
        <span
          className={clsx(
            pulsingCircleVariants({ size, color }),
            color === 'custom' && customColor,
            'animate-pulse',
          )}
        />
        <span
          className={clsx(
            'absolute',
            pulsingCircleVariants({ size, color }),
            color === 'custom' && customColor,
            'opacity-75 animate-ping',
          )}
        />
      </div>
    </div>
  );
}
