import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import Loading from '@/components/Loading';

const buttonVariants = cva('font-semibold flex gap-2 items-center', {
  variants: {
    fullWidth: {
      true: 'w-full',
      false: '',
    },
    variant: {
      primary:
        'bg-primary-400 text-white [&_.path]:fill-white hover:bg-primary-500 border-[1.5px] border-primary-400 hover:border-primary-500 active:border-primary-600 active:bg-primary-600 active:text-primary-100 disabled:bg-neutral-700 disabled:text-neutral-400 disabled:border-neutral-700 [&_.path]:disabled:fill-neutral-400',
      secondary:
        'bg-transparent text-primary-200 border-[1.5px] border-primary-200 [&_.path]:fill-primary-200 [&_.path]:hover:fill-primary-300 hover:text-primary-300 hover:border-primary-300 [&_.path]:active:fill-primary-500 active:text-primary-500 active:border-primary-500 disabled:bg-transparent disabled:text-neutral-400 disabled:border-neutral-600 [&_.path]:disabled:fill-neutral-400',
      warning:
        'bg-warning-600 text-white [&_.path]:fill-white hover:bg-warning-700 active:bg-warning-800 disabled:bg-neutral-700 disabled:text-neutral-400 disabled:border-neutral-700 [&_.path]:disabled:fill-neutral-400',
      neutral:
        'bg-neutral-750 text-primary-400 [&_.path]:fill-primary-400 hover:bg-neutral-700 active:bg-neutral-600 disabled:bg-neutral-700 disabled:text-neutral-400 disabled:border-neutral-700 [&_.path]:disabled:fill-neutral-400',
      link: '',
    },
    size: {
      lg: 'px-5 h-14 text-base',
      md: 'px-5 h-12 text-base',
      sm: 'px-4 h-10 text-sm',
    },
    radius: {
      full: 'rounded-full',
      lg: 'rounded-lg',
      md: 'rounded',
    },
    justify: {
      center: 'justify-center',
      between: 'justify-between',
    },
  },
  defaultVariants: {
    variant: 'primary',
    fullWidth: false,
    size: 'md',
    radius: 'md',
    justify: 'center',
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  rightSection?: ReactNode;
  leftSection?: ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      radius,
      fullWidth = false,
      asChild = false,
      isLoading = false,
      rightSection,
      leftSection,
      justify,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={buttonVariants({ variant, size, radius, fullWidth, justify, className })}
        ref={ref}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {isLoading ? (
              <Loading size={24} color="white" />
            ) : (
              <>
                {leftSection}
                {children}
                {rightSection}
              </>
            )}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export default Button;
