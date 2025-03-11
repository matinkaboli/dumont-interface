'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  Control,
  FieldErrors,
  UseFormResetField,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

import isEmpty from '@/helpers/isEmpty';
import toFixedNumber from '@/helpers/toFixedNumber';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import AmountDetails from '@/views/_components/AmountDetails';
import BetButton from '@/views/_components/BetButton';
import AmountInput from '@/views/_components/AmountInput';

import { BetData } from '../index';

interface Props {
  control: Control<BetData>;
  isFormValid: boolean;
  inputErrors?: FieldErrors<BetData>;
  setValue: UseFormSetValue<BetData>;
  payout: number;
  totalOdds: number;
  trigger: UseFormTrigger<BetData>;
  disabledButtonLabel: string;
  isButtonDisabled: boolean;
  isSubmitted: boolean;
  touchedFields: Partial<{ amount?: boolean | undefined; keys?: boolean[] | undefined }>;
  resetField: UseFormResetField<BetData>;
}

const Amount = ({
  control,
  inputErrors,
  setValue,
  payout,
  totalOdds,
  trigger,
  isFormValid,
  isButtonDisabled,
  disabledButtonLabel,
  touchedFields,
  isSubmitted,
  resetField,
}: Props) => {
  const { isCreated, data: game } = useTypedSelector((state) => state.game);
  const [amount, setAmount] = useState();
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedPayout =
    isEmpty(inputErrors) || inputErrors?.amount?.type === 'validate' ? payout : 0;

  const amountDetails = [
    { id: '1', label: 'Total odds', value: `x${toFixedNumber(totalOdds)}` },
    { id: '2', label: 'Possible payout', value: `$${formattedPayout}` },
  ];

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
    resetField('amount');
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
              inputErrors={inputErrors}
              totalOdds={totalOdds}
              setValue={setValue}
              setAmount={setAmount}
            />

            <AmountDetails
              details={amountDetails}
              className={!isEmpty(inputErrors) && touchedFields?.amount ? 'mt-1' : 'mt-4'}
            />
          </div>

          <BetButton
            type="submit"
            size="md"
            showTooltip={!isCreated && isEmpty(game)}
            tooltipContent="No game created yet"
            disabled={isFormValid}
            disabledButtonLabel={disabledButtonLabel}
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-2">
        {isExpanded && (
          <div className="fixed inset-0 bg-black opacity-75 z-40" onClick={onCloseDetail} />
        )}

        <div
          className={clsx(
            'bg-primary-900 px-5 pb-6 fixed md:-bottom-px bottom-[76px] right-0 left-0 rounded-t-3xl z-50',
            isExpanded ? 'pt-3.5' : 'pt-6',
          )}
          onClick={(e) => e.stopPropagation()}
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
                <button
                  type="button"
                  onClick={onCloseDetail}
                  className="h-[5px] w-14 block mx-auto bg-primary-700 rounded-full"
                />

                <AmountInput
                  className="mt-6"
                  control={control}
                  touchedFields={touchedFields}
                  inputErrors={inputErrors}
                  totalOdds={totalOdds}
                  setValue={setValue}
                  setAmount={setAmount}
                />

                <AmountDetails
                  isDesktopView={false}
                  details={amountDetails}
                  className="pt-8 pb-10"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <BetButton
            size="md"
            type={isExpanded ? 'submit' : 'button'}
            disabled={isExpanded ? isFormValid : isButtonDisabled}
            disabledButtonLabel={disabledButtonLabel}
            showTooltip={!isCreated && isEmpty(game)}
            tooltipContent="No game created yet"
            label={isExpanded ? 'Bet' : `Bet (x${toFixedNumber(totalOdds)})`}
            onClick={onExpandDetail}
          />
        </div>
      </div>
    </>
  );
};

export default Amount;
