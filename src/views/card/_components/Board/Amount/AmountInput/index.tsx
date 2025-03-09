import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form';
import Image from 'next/image';
import BigNumber from 'bignumber.js';
import clsx from 'clsx';

import { Icon, Input } from '@/components';
import { Props as InputProps } from '@/components/Input';
import isEmpty from '@/helpers/isEmpty';
import toFixedNumber from '@/helpers/toFixedNumber';
import humanizeAmount from '@/helpers/humanizeAmount';
import formatDecimal from '@/helpers/formatDecimal';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { BetData } from '@/views/card/_components/Board';

import MaxButton from './MaxButton';

const inputProps: InputProps = {
  name: 'amount',
  size: 'sm',
  placeholder: 'Enter amount',
  rightSection: <Image src="/images/USDC.png" width={24} height={24} alt="" />,
};

interface Props {
  className?: string;
  control: Control<BetData>;
  touchedFields: Partial<{ amount?: boolean | undefined; keys?: boolean[] | undefined }>;
  inputErrors?: FieldErrors<BetData>;
  totalOdds: number;
  setValue: UseFormSetValue<BetData>;
  setAmount: Dispatch<SetStateAction<any>>;
}

const AmountInput = ({
  className = '',
  touchedFields,
  control,
  inputErrors,
  totalOdds,
  setValue,
  setAmount,
}: Props) => {
  const { balance } = useTypedSelector((state) => state.account);
  const { minBetAmount, maxBetAmount } = useTypedSelector((state) => state.bet);

  const inputValidation = {
    required: 'Bet amount is required.',
    pattern: { value: /^\d*\.?\d+$/, message: 'This input is number only.' },
    validate: (value: any) => {
      setAmount(value);
      if (totalOdds > 0) {
        const payoutValue = value * totalOdds;

        if (balance && value > +balance) return 'Insufficient USDC balance';

        const maxBetAmountMargined = (maxBetAmount * 98) / 100;
        const maxBetValue = maxBetAmountMargined / totalOdds;

        if (payoutValue > maxBetAmountMargined)
          return `Max bet is $${humanizeAmount(
            formatDecimal({ amount: maxBetValue, decimalPlaces: 2 }),
          )}`;

        if (value < minBetAmount) return `Min bet is $${minBetAmount}`;

        return true;
      }
    },
  };

  const setMaxValue = () => {
    touchedFields.amount = true;

    let maximumPossibleAmount = '0';

    if (!isEmpty(balance) && balance) {
      const maxPossible = new BigNumber(maxBetAmount).div(totalOdds).times(97).div(100);

      let maxPossibleString = balance.toString();

      if (maxPossible.isLessThan(balance)) {
        maxPossibleString = maxPossible.toString();
      }

      maximumPossibleAmount = maxPossibleString;
    }

    maximumPossibleAmount = toFixedNumber(maximumPossibleAmount, 3);

    setValue('amount', maximumPossibleAmount, { shouldDirty: true, shouldValidate: true });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => {
    touchedFields.amount = true;

    const { value } = e.target;

    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      onChange(value);
    }
  };

  return (
    <>
      <div className={clsx('flex justify-between mb-2', className)}>
        <div className="font-medium text-xs text-white">Amount</div>
        <MaxButton onClick={setMaxValue}>
          <Icon name="caret-up" />
        </MaxButton>
      </div>

      <Controller
        name="amount"
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
