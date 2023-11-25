import { type ButtonHTMLAttributes, type FC } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  '',
  {
    variants: {
      variant: {
        primary: 'bg-neutrals-50 text-black',
        secondary: '',
        warning: '',
        neutral: '',
        link: '',
      },
      size: {
        lg: '',
        md: '',
        sm: '',
      },
      radius: {
        lg: '',
        md: '',
        sm: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
      radius: 'lg',
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label: string;
}

const Button: FC<ButtonProps> = ({ className, variant, size, label, ...props }) => (
  <button className={buttonVariants({ variant, size, className })} {...props}>
    {label}
  </button>
);

export default Button;
