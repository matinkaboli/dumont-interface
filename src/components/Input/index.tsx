import { type InputHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import InputSection from './InputSection';

const inputVariants = cva(
  'px-4 bg-white border font-medium rounded-lg w-full outline-none disabled:bg-neutrals-100',
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
  label?: string;
}

const Input = ({
  className,
  type,
  size,
  rightSection,
  leftSection,
  rightSectionPointerEvents = 'none',
  leftSectionPointerEvents = 'none',
  error,
  label,
  ...props
}: Props) => {
  const inputClassName = inputVariants({ size, className });
  const hasError = Boolean(error);

  return (
    <div>
      {label && <label className="font-medium text-white text-sm mb-1">{label}</label>}

      <div className={`relative ${hasError ? '[&_.path]:fill-error-500': '[&_.path]:fill-neutrals-800'}`}>
        <InputSection
          position="left"
          section={leftSection}
          className={`pointer-events-${leftSectionPointerEvents}`}
        />
        <input
          type={type}
          className={`${leftSection ? 'pl-12' : 'pl-4'} ${
            hasError
              ? 'border-error-500 text-error-500 placeholder:text-error-500'
              : 'border-neutrals-300 text-neutrals-800 placeholder:text-neutrals-400'
          } ${inputClassName}`}
          {...props}
        />
        <InputSection
          position="right"
          section={rightSection}
          className={`pointer-events-${rightSectionPointerEvents}`}
        />
      </div>

      {hasError && <p className="text-xs text-error-500 font-medium mt-2">{error}</p>}
    </div>
  );
};

export default Input;
