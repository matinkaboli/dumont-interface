import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'font-semibold flex gap-2 items-center disabled:bg-primary-650 disabled:text-neutral-500 disabled:border-primary-650',
  {
    variants: {
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      variant: {
        primary:
          'bg-primary-300 text-white [&_.path]:fill-white hover:bg-primary-400 border border-primary-200 hover:border-primary-400 active:border-primary-500 active:bg-primary-500 active:text-primary-100',
        secondary:
          'bg-transparent text-primary-100 border border-primary-100 [&_.path]:fill-primary-100 [&_.path]:hover:fill-primary-200 hover:text-primary-200 hover:border-primary-200 [&_.path]:active:fill-primary-400 active:text-primary-400 active:border-primary-400',
        warning:
          'bg-warning-600 text-white [&_.path]:fill-white hover:bg-warning-700 active:bg-warning-800',
        neutral:
          'bg-neutral-100 text-neutral-600 [&_.path]:fill-neutral-600 hover:bg-neutral-200 active:bg-neutral-50',
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
  },
);

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
              <div>Loading...</div>
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
