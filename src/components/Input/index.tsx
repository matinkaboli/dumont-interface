import { type InputHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

import InputSection from './InputSection';

const inputVariants = cva(
  'px-2 bg-white border font-medium rounded-lg w-full outline-none disabled:bg-neutral-100',
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

const labelVariants = cva(
  'font-medium text-white mb-2 block',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  rightSection?: ReactNode;
  leftSection?: ReactNode;
  rightSectionPointerEvents?: 'none' | 'auto';
  leftSectionPointerEvents?: 'none' | 'auto';
  error?: string;
  label?: string;
  description?: string;
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
  disabled,
  description,
  ...props
}: Props) => {
  const inputClassName = inputVariants({ size, className });
  const hasError = Boolean(error);

  return (
    <div>
      {label && <label className={labelVariants({ size })}>{label}</label>}

      <div
        className={clsx(
          'relative',
          hasError ? '[&_.path]:fill-error-500' : '[&_.path]:fill-neutral-800',
          disabled && '[&_.path]:opacity-50',
        )}
      >
        <InputSection
          position="left"
          section={leftSection}
          className={`pointer-events-${leftSectionPointerEvents}`}
        />
        <input
          type={type}
          className={clsx(
            leftSection ? 'pl-11' : 'pl-3',
            rightSection ? 'pr-11' : 'pr-3',
            hasError
              ? 'border-error-500 text-error-500 placeholder:text-error-500'
              : 'border-neutral-300 text-neutral-800 focus:border-neutral-800 placeholder:text-neutral-400',
            inputClassName,
          )}
          disabled={disabled}
          {...props}
        />
        <InputSection
          position="right"
          section={rightSection}
          className={`pointer-events-${rightSectionPointerEvents}`}
        />
      </div>

      {description && <p className="text-xs text-neutral-500 font-medium mt-2">{description}</p>}

      {hasError && (
        <p className={clsx('text-xs text-error-500 font-medium', description ? 'mt-1' : 'mt-2')}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
