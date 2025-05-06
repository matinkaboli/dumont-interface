'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva, VariantProps } from 'class-variance-authority';
import { motion } from 'motion/react';
import { clsx } from 'clsx';

import { Icon } from '@/components';

const rootVariants = cva(
  'rounded-md border-[1.5px] border-neutral-200 data-[state=checked]:bg-success-700 data-[state=checked]:border-success-700 enabled:hover:shadow-checkbox enabled:hover:border-rgba-success-700 disabled:bg-black/[0.05] transition ease-in-out',
  {
    variants: {
      size: { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' },
    },
    defaultVariants: { size: 'lg' },
  },
);

const indicatorVariants = cva('', {
  variants: {
    size: { sm: 'scale-[0.67]', md: 'scale-[0.83]', lg: 'scale-1' },
  },
  defaultVariants: { size: 'lg' },
});

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof rootVariants> {
  label?: string;
  containerClassName?: string;
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, size, label, containerClassName, id, ...props }, ref) => (
    <div className={clsx(containerClassName, 'flex items-center space-x-1')}>
      <CheckboxPrimitive.Root
        id={id}
        ref={ref}
        className={rootVariants({ size, className })}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current border-none rounded-md">
          <motion.div
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 3 }}
          >
            <Icon name="tick" className={indicatorVariants({ size })} />
          </motion.div>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {label && (
        <label htmlFor={id} className="text-white text-sm">
          {label}
        </label>
      )}
    </div>
  ),
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default Checkbox;
