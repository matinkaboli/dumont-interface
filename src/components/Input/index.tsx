import { type InputHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import InputSection from './InputSection';

const inputVariants = cva(
  'px-4 bg-white border border-neutrals-300 font-medium text-neutrals-800 placeholder:text-neutrals-400 rounded-lg w-full outline-none disabled:bg-neutrals-100',
  {
    variants: {
      size: {
        sm: 'h-10 text-sm',
        md: 'h-12 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  rightSection?: ReactNode;
  leftSection?: ReactNode;
  rightSectionPointerEvents?: 'none' | 'auto';
  leftSectionPointerEvents?: 'none' | 'auto';
  error?: string;
}

const Input = ({
  className,
  type,
  size,
  rightSection,
  leftSection,
  rightSectionPointerEvents = 'none',
  leftSectionPointerEvents = 'none',
  ...props
}: Props) => {
  const inputClassName = inputVariants({ size, className });

  return (
    <div className="relative">
      <InputSection
        position="left"
        section={leftSection}
        className={`pointer-events-${leftSectionPointerEvents}`}
      />
      <input
        type={type}
        className={`${leftSection ? 'pl-12' : 'pl-4'} ${inputClassName}`}
        {...props}
      />
      <InputSection
        position="right"
        section={rightSection}
        className={`pointer-events-${rightSectionPointerEvents}`}
      />
    </div>
  );
};

export default Input;
