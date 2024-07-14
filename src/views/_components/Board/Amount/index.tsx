'use client';

import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

import { Icon, Input } from '@/components';
import { Props as InputProps } from '@/components/Input';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import transformRanks from '@/helpers/transformedRanks';

import AmountInfo from './Info';
import BetButton from './BetButton';
import MaxButton from './MaxButton';
import { BetData, TOTAL_CARDS_LENGTH } from '../index';

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

const inputValidation = {
  required: 'Bet amount is required.',
  pattern: { value: /^\d+$/, message: 'This input is number only.' },
};

const calculateOdds = (
  keys: string[],
  cardOccurrences: { [key: string]: number },
  cardsLength: number,
) => {
  if (keys.length === 0) return 0;

  const transformedKeys = transformRanks(keys);
  const total = transformedKeys.reduce((sum, key) => sum + (cardOccurrences[key] || 0), 0);

  const result = (TOTAL_CARDS_LENGTH - cardsLength) / total;
  return Math.floor(result * 10) / 10;
};

interface Props {
  control: Control<BetData>;
  disabledButton: boolean;
  inputErrors?: FieldErrors<BetData>;
  keys: string[];
  setValue: UseFormSetValue<BetData>;
  validCardNumbersLength: number;
  cardOccurrences: { [key: string]: number };
}

const Amount = ({
  control,
  disabledButton,
  inputErrors,
  setValue,
  keys,
  validCardNumbersLength,
  cardOccurrences,
}: Props) => {
  const { balance } = useTypedSelector((state) => state.account);
  const [isOpen, setIsOpen] = useState(false);
  const odds = calculateOdds(keys, cardOccurrences, validCardNumbersLength);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const setMaxValue = () => setValue('amount', `${balance}`);

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
              render={({ field }) => <Input errors={inputErrors} {...inputProps} {...field} />}
            />

            <AmountInfo
              odd={odds}
              total={220}
              className="gap-3 mt-4"
              labelClassName="text-white"
              valueClassName="text-white opacity-50"
            />
          </div>

          <BetButton size="md" disabled={disabledButton} />
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
            odd={odds}
            total={220}
            className="bg-neutral-750 border border-neutral-600 rounded-lg px-4 py-2 gap-2"
            labelClassName="text-neutral-400"
            valueClassName="text-neutral-200"
          />
        </motion.div>

        <div className="bg-neutral-750 px-5 pt-6 pb-8 fixed -bottom-px right-0 left-0 rounded-t-2xl z-10">
          <BetButton size="lg" disabled={disabledButton} />
        </div>
      </div>
    </>
  );
};

export default Amount;
