import { ReactNode, Ref } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const statusVariant = cva('flex items-center gap-1', {
  variants: {
    variant: {
      success: 'text-success-500',
      error: 'text-error-500',
      warning: 'text-warning-500',
      default: 'text-neutral-300',
    },
  },
});

const circleVariant = cva('w-1 h-1 rounded-full', {
  variants: {
    variant: {
      success: 'bg-success-500',
      error: 'bg-error-500',
      warning: 'bg-warning-500',
      default: 'bg-neutral-300',
    },
  },
});

interface Props extends VariantProps<typeof statusVariant> {
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLSpanElement>;
}

const Status =
  ({ ref, variant = 'success', className = '', children }: Props) => (
    <span ref={ref} className={statusVariant({ variant, className })}>
      <span className={circleVariant({ variant })}></span>
      {children}
    </span>
  );
Status.displayName = 'Status';

export default Status;
