import React, { type InputHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';
import { clsx } from 'clsx';

import isEmpty from '@/helpers/isEmpty';

import InputSection from './InputSection';

const inputVariants = cva(
  'px-2 border font-medium rounded-lg w-full outline-none disabled:bg-neutral-100 placeholder:text-neutral-400',
  {
    variants: {
      variant: {
        primary: 'bg-white border-neutral-300 text-neutral-800 focus:border-neutral-800',
        secondary: 'bg-neutral-600 border-neutral-550 text-neutral-50 focus:border-neutral-500',
      },
      size: {
        sm: 'h-10 text-sm',
        md: 'h-12 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
  },
);

const labelVariants = cva('font-medium text-white mb-2 block', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  rightSection?: ReactNode;
  leftSection?: ReactNode;
  rightSectionPointerEvents?: 'none' | 'auto';
  leftSectionPointerEvents?: 'none' | 'auto';
  label?: string;
  description?: string;
  name: string;
  errors?: FieldErrors<any>;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      type,
      size,
      rightSection,
      leftSection,
      rightSectionPointerEvents = 'none',
      leftSectionPointerEvents = 'none',
      label,
      disabled,
      description,
      name,
      variant,
      errors = {},
      ...props
    },
    ref,
  ) => {
    const inputClassName = inputVariants({ size, className, variant });

    return (
      <div>
        {label && <label className={labelVariants({ size })}>{label}</label>}

        <div
          className={clsx(
            'relative',
            isEmpty(errors) ? '[&_.path]:fill-neutral-800' : '[&_.path]:fill-error-500',
            disabled && '[&_.path]:opacity-50',
            variant,
          )}
        >
          <InputSection
            position="left"
            section={leftSection}
            className={`pointer-events-${leftSectionPointerEvents}`}
          />
          <input
            type={type}
            ref={ref}
            className={clsx(
              leftSection ? 'pl-11' : 'pl-3',
              rightSection ? 'pr-11' : 'pr-3',
              !isEmpty(errors) && '!border-error-500 !text-error-500 !placeholder:text-error-500',
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

        {!isEmpty(errors) && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p
                className={clsx(
                  'text-xs text-error-500 font-medium',
                  description ? 'mt-1' : 'mt-2',
                )}
              >
                {message}
              </p>
            )}
          />
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export default Input;
