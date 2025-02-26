'use client';

import { useEffect, useState } from 'react';
import { Control, FieldErrors, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

import isEmpty from '@/helpers/isEmpty';
import toFixedNumber from '@/helpers/toFixedNumber';

import AmountInfo from './Info';
import BetButton from './BetButton';
import AmountInput from './AmountInput';
import { BetData } from '../index';

interface Props {
  control: Control<BetData>;
  disabledButton: boolean;
  inputErrors?: FieldErrors<BetData>;
  setValue: UseFormSetValue<BetData>;
  payout: number;
  totalOdds: number;
  trigger: UseFormTrigger<BetData>;
  disabledButtonLabel: string;
  isKeySelected: boolean;
  isSubmitted: boolean;
  touchedFields: Partial<{ amount?: boolean | undefined; keys?: boolean[] | undefined }>;
}

const Amount = ({
  control,
  inputErrors,
  setValue,
  payout,
  totalOdds,
  trigger,
  disabledButton,
  isKeySelected,
  disabledButtonLabel,
  touchedFields,
  isSubmitted,
}: Props) => {
  const [amount, setAmount] = useState();
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedPayout =
    isEmpty(inputErrors) || inputErrors?.amount?.type === 'validate' ? payout : 0;

  useEffect(() => {
    if (totalOdds > 0 && amount) trigger('amount');
  }, [totalOdds, amount]);

  useEffect(() => {
    if (isSubmitted) setIsExpanded(false);
  }, [isSubmitted]);

  const onExpandDetail = () => {
    if (!isExpanded) setIsExpanded(true);
  };

  const onCloseDetail = () => {
    setIsExpanded(false);
    setValue('amount', '', { shouldDirty: true, shouldValidate: true });
  };

  return (
    <>
      {/* Desktop View */}
      <div className="md:block hidden bg-gradiant-border bg-primary-800 bg-origin-border border border-transparent rounded-lg w-full h-full">
        <div className="flex flex-col justify-between bg-primary-900 px-4 py-6 rounded-lg w-full h-full">
          <div>
            <AmountInput
              control={control}
              touchedFields={touchedFields}
              totalOdds={totalOdds}
              setValue={setValue}
              setAmount={setAmount}
            />

            <AmountInfo
              odd={totalOdds}
              payout={formattedPayout}
              className={clsx(
                'gap-3',
                !isEmpty(inputErrors) && touchedFields?.amount ? 'mt-1' : 'mt-4',
              )}
              labelClassName="text-white text-sm"
              valueClassName="text-neutral-400 text-sm"
            />
          </div>

          <BetButton
            type="submit"
            size="md"
            disabled={disabledButton}
            disabledButtonLabel={disabledButtonLabel}
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-2">
        {isExpanded && (
          <div className="fixed inset-0 bg-black opacity-75 z-10" onClick={onCloseDetail} />
        )}

        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-neutral-750 px-5 sm:pt-6 sm:pb-8 py-6 fixed sm:-bottom-px bottom-[76px] right-0 left-0 rounded-t-2xl z-10"
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0, y: 20 }}
                animate={{ height: 'auto', opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: 20 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  opacity: { duration: 0.2 },
                }}
                className="overflow-hidden"
              >
                <div className="rounded-lg bg-neutral-750">
                  <AmountInput
                    control={control}
                    touchedFields={touchedFields}
                    totalOdds={totalOdds}
                    setValue={setValue}
                    setAmount={setAmount}
                  />

                  <AmountInfo
                    odd={totalOdds}
                    payout={formattedPayout}
                    className="bg-neutral-750 gap-3 pt-8 pb-10"
                    labelClassName="text-white text-base"
                    valueClassName="text-white text-base"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <BetButton
            size="md"
            type={isExpanded ? 'submit' : 'button'}
            disabled={isExpanded ? disabledButton : !isKeySelected}
            disabledButtonLabel={disabledButtonLabel}
            label={isExpanded ? 'Bet' : `Bet (x${toFixedNumber(totalOdds)})`}
            onClick={onExpandDetail}
          />
        </div>
      </div>
    </>
  );
};

export default Amount;
