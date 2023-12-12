'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { cva, VariantProps } from 'class-variance-authority';

const size = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

const rootVariants = cva('', {
  variants: {
    size,
    variant: {
      primary: 'border border-[rgba(0, 127, 103, 0.20)]',
      secondary: 'border border-neutral-200',
    },
  },
  defaultVariants: {
    size: 'lg',
    variant: 'primary',
  },
});

const indicatorVariants = cva('', {
  variants: {
    size: size,
    variant: {
      primary: 'bg-success-700',
      secondary: 'bg-black opacity-50',
    },
  },
  defaultVariants: {
    size: 'lg',
    variant: 'primary',
  },
});

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof rootVariants> {
  label?: string;
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, size, variant, label, id, ...props }, ref) => (
    <div className="flex items-center space-x-1">
      <CheckboxPrimitive.Root
        id={id}
        ref={ref}
        className={clsx(
          'peer shrink-0 rounded-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
          rootVariants({ variant, size, className }),
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={clsx('flex items-center justify-center text-current')}
        >
          <div
            className={clsx(
              'bg-black text-white rounded-sm text-xs absolute',
              indicatorVariants({ variant, size, className }),
            )}
          >
            o
          </div>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {label && (
        <label className="text-sm" htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  ),
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default Checkbox;
