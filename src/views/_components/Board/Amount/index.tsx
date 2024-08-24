'use client';

import { Control, Controller, FieldErrors, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import { Icon, Input } from '@/components';
import { Props as InputProps } from '@/components/Input';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import isEmpty from '@/helpers/isEmpty';
import humanizeAmount from '@/helpers/humanizeAmount';
import formatDecimal from '@/helpers/formatDecimal';

import AmountInfo from './Info';
import BetButton from './BetButton';
import MaxButton from './MaxButton';
import { BetData } from '../index';
import BigNumber from 'bignumber.js';
import toFixedNumber from '@/helpers/toFixedNumber';

const inputProps: InputProps = {
  name: 'amount',
  size: 'sm',
  placeholder: 'Enter amount',
  rightSection: <Image src="/images/USDT.svg" width={24} height={24} alt="" />,
};

const mobileInputProps: InputProps = {
  name: 'amount',
  size: 'md',
  placeholder: 'USDT amount',
  rightSectionPointerEvents: 'auto',
};

interface Props {
  control: Control<BetData>;
  disabledButton: boolean;
  inputErrors?: FieldErrors<BetData>;
  setValue: UseFormSetValue<BetData>;
  payout: string;
  totalOdds: number;
  trigger: UseFormTrigger<BetData>;
  disabledButtonLabel: string;
}

const Amount = ({
  control,
  inputErrors,
  setValue,
  payout,
  totalOdds,
  trigger,
  disabledButton,
  disabledButtonLabel,
}: Props) => {
  const { balance } = useTypedSelector((state) => state.account);
  const { minBetAmount, maxBetAmount } = useTypedSelector((state) => state.bet);
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState();
  const formattedPayout =
    isEmpty(inputErrors) || inputErrors?.amount?.type === 'validate' ? payout : '0';

  useEffect(() => {
    if (totalOdds > 0 && amount) {
      trigger('amount');
    }
  }, [totalOdds, amount]);

  const inputValidation = {
    required: 'Bet amount is required.',
    pattern: { value: /^\d*\.?\d+$/, message: 'This input is number only.' },
    validate: (value: any) => {
      setAmount(value);
      if (totalOdds > 0) {
        const payoutValue = value * totalOdds;

        if (balance && value > +balance) return 'Insufficient USDT balance';

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

  const handleToggle = () => setIsOpen((prev) => !prev);

  const setMaxValue = () => {
    let maximumPossibleAmount = '0';

    if (!isEmpty(balance) && balance) {
      const maxPossible = new BigNumber(maxBetAmount).div(totalOdds).times(97).div(100);

      if (maxPossible.isLessThan(balance)) {
        maximumPossibleAmount = maxPossible.toString();
      } else {
        maximumPossibleAmount = balance.toString();
      }
    }

    maximumPossibleAmount = toFixedNumber(maximumPossibleAmount, 4);

    setValue('amount', maximumPossibleAmount, { shouldDirty: true, shouldValidate: true });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => {
    const { value } = e.target;

    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      onChange(value);
    }
  };

  return (
    <>
      {/* Desktop View */}
      <div className="md:block hidden bg-gradiant-border bg-primary-800 bg-origin-border border border-transparent rounded-lg w-full h-full">
        <div className="flex flex-col justify-between bg-primary-800 px-4 py-6 rounded-lg w-full h-full">
          <div>
            <div className="flex justify-between mb-2">
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
                  errors={inputErrors}
                  {...inputProps}
                  {...field}
                  onChange={(e) => handleInputChange(e, field.onChange)}
                />
              )}
            />

            <AmountInfo
              odd={totalOdds}
              payout={formattedPayout}
              className={clsx('gap-3', isEmpty(inputErrors) ? 'mt-4' : 'mt-1')}
              labelClassName="text-white"
              valueClassName="text-white opacity-50"
            />
          </div>

          <BetButton
            size="md"
            disabled={disabledButton}
            disabledButtonLabel={disabledButtonLabel}
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-2">
        <div className="flex items-end gap-2">
          <div className="grow">
            <Controller
              name="amount"
              control={control}
              rules={inputValidation}
              render={({ field }) => (
                <Input
                  {...field}
                  {...mobileInputProps}
                  errors={inputErrors}
                  rightSection={
                    <div className="flex gap-3 items-center">
                      <span className="text-sm font-medium text-neutral-400">USDT</span>
                      <MaxButton onClick={setMaxValue} />
                    </div>
                  }
                  onChange={(e) => handleInputChange(e, field.onChange)}
                />
              )}
            />
          </div>
          <div className="flex-none">
            <button
              type="button"
              onClick={handleToggle}
              className="bg-neutral-800 border border-neutral-600 h-12 w-12 rounded-lg"
            >
              <motion.span
                className="block"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon name="angle-down" color="white" width="28" height="28" className="mx-auto" />
              </motion.span>
            </button>
          </div>
        </div>

        <motion.div
          className="overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: isOpen ? 'auto' : '0' }}
        >
          <AmountInfo
            odd={totalOdds}
            payout={formattedPayout}
            className="bg-neutral-750 border border-neutral-600 rounded-lg px-4 py-2 gap-2"
            labelClassName="text-neutral-400"
            valueClassName="text-neutral-200"
          />
        </motion.div>

        <div className="bg-neutral-750 px-5 pt-6 pb-8 fixed -bottom-px right-0 left-0 rounded-t-2xl z-10">
          <BetButton
            size="lg"
            disabled={disabledButton}
            disabledButtonLabel={disabledButtonLabel}
          />
        </div>
      </div>
    </>
  );
};

export default Amount;
