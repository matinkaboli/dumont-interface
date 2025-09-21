import React, { ChangeEvent } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import Image from 'next/image';
import clsx from 'clsx';

import { Icon, Input } from '@/components';
import { Props as InputProps } from '@/components/Input';

import MaxButton from './MaxButton';

const inputProps: InputProps = {
  name: 'amount',
  size: 'sm',
  placeholder: 'Enter amount',
  rightSection: <Image src='/images/USDC.png' width={24} height={24} alt='' />,
};

interface Props {
  className?: string;
  control: Control<any>;
  touchedFields: Partial<{ amount?: boolean | undefined; keys?: boolean[] | undefined }>;
  inputErrors?: FieldErrors<any>;
  onValidate: (value: any) => any;
  setMaxValue: () => void;
}

const AmountInput = (
  {
    className = '',
    touchedFields,
    control,
    inputErrors,
    onValidate,
    setMaxValue,
  }: Props) => {

  const inputValidation = {
    required: 'Bet amount is required.',
    pattern: { value: /^\d*\.?\d+$/, message: 'This input is number only.' },
    validate: (value: any) => onValidate(value),
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => {
    touchedFields.amount = true;

    const { value } = e.target;

    // allows whole numbers OR numbers with up to 3 decimal places
    if (value === '' || /^\d+(\.\d{0,3})?$/.test(value)) {
      onChange(value);
    }
  };

  return (
    <>
      <div className={clsx('flex justify-between mb-2', className)}>
        <div className='font-medium text-xs text-white'>Amount</div>
        <MaxButton onClick={setMaxValue}>
          <Icon name='caret-up' />
        </MaxButton>
      </div>

      <Controller
        name='amount'
        control={control}
        rules={inputValidation}
        render={({ field }) => (
          <Input
            {...field}
            {...inputProps}
            errors={touchedFields?.amount ? inputErrors : {}}
            onChange={(e) => handleInputChange(e, field.onChange)}
          />
        )}
      />
    </>
  );
};

export default AmountInput;
