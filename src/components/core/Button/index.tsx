import { type ButtonHTMLAttributes, type FC, ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'font-semibold flex gap-2 items-center disabled:bg-primary-650 disabled:text-neutrals-500',
  {
    variants: {
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      variant: {
        primary:
          'bg-primary-200 text-white hover:bg-primary-400 active:bg-primary-500 active:text-primary-100',
        secondary:
          'bg-transparent text-primary-200 border border-primary-200 hover:text-primary-100 hover:border-primary-100 active:text-primary-200 active:border-primary-200',
        warning: 'bg-warning-600 text-white hover:bg-warning-700 active:bg-warning-800',
        neutral: 'bg-neutrals-100 text-neutrals-600 hover:bg-neutrals-200 active:bg-neutrals-50',
        link: '',
      },
      size: {
        lg: 'px-5 h-14 text-base',
        md: 'px-5 h-12 text-base',
        sm: 'px-4 h-10 text-xs',
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

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  rightSection?: ReactNode;
  leftSection?: ReactNode;
}

const Button: FC<ButtonProps> = ({
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
}) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={buttonVariants({ variant, size, radius, fullWidth, justify, className })}
      {...props}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {rightSection}
          {children}
          {leftSection}
        </>
      )}
    </Comp>
  );
};

export default Button;
