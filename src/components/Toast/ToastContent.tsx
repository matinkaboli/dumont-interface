import React from 'react';
import clsx from 'clsx';
import { cva, VariantProps } from 'class-variance-authority';

const headerVariants = cva('text-sm font-bold', {
  variants: {
    variant: {
      neutral: 'text-white',
      success: 'text-error-500',
      error: 'text-success-500',
    },
  },
  defaultVariants: {
    variant: 'neutral',
  },
});

interface Props extends VariantProps<typeof headerVariants> {
  className?: string;
  title?: string;
  description?: string;
}

const ToastContent = React.forwardRef<HTMLDivElement, Props>(
  ({ className, variant, title, description, ...props }, ref) => (
    <div ref={ref} className={clsx('flex flex-col gap-1', className)} {...props}>
      <h6 className={headerVariants({ variant })}>{title}</h6>
      <p className="text-xs text-nutreal-300">{description}</p>
    </div>
  ),
);
ToastContent.displayName = 'ToastContent';

export default ToastContent;
