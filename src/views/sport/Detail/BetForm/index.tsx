'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { AppDispatch } from '@/redux/store';
import { openDialog } from '@/redux/features/dialogSlice';

import BetButton from '@/views/_components/BetButton';
import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import CustomSheet from '@/views/_components/CustomSheet';

import AmountControls from './AmountControls';
import ClosePosition from './ClosePosition';
import PlaceBet from './PlaceBet';

export interface SportFormData {
  amount: string;
}

const BetForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    control,
    setValue,
    handleSubmit,
    resetField,
    formState: { errors, touchedFields },
  } = useForm<SportFormData>({
    mode: 'onChange',
    defaultValues: {
      amount: '',
    },
  });

  const onExpandDetail = () => {
    if (!isExpanded) setIsExpanded(true);
  };

  const onCloseDetail = () => {
    setIsExpanded(false);
    resetField('amount');
  };

  const onConfirm = () => {
    dispatch(
      openDialog({
        content: (
          <AnimatedDialogContent key="close">
            <ClosePosition positionSize="4,000" fee="600" pnl="3,400" />
          </AnimatedDialogContent>
        ),
      }),
    );
  };

  const onSubmit = () => {
    setIsExpanded(false);

    dispatch(
      openDialog({
        content: (
          <PlaceBet
            team="Real Madrid"
            entryPrice="0.6"
            liquidationPrice="0.4"
            positionSize="4,000"
            fee="50"
            onConfirm={onConfirm}
          />
        ),
      }),
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Desktop View */}
      <div className="h-full md:flex hidden flex-col justify-between bg-primary-900 bordr-[1.5px] border-primary-700 rounded-lg col-span-1 p-4">
        <AmountControls
          control={control}
          touchedFields={touchedFields}
          errors={errors}
          setValue={setValue}
        />
        <BetButton disabledButtonLabel="Bet" />
      </div>

      {/* Mobile View */}
      <div className="md:hidden block text-white">
        <CustomSheet
          isExpanded={isExpanded}
          onClose={onCloseDetail}
          buttonElement={
            <BetButton
              size="md"
              type={isExpanded ? 'submit' : 'button'}
              disabledButtonLabel="Bet"
              onClick={onExpandDetail}
            />
          }
        >
          <div className="flex flex-col gap-4 pt-6 pb-10">
            <AmountControls
              control={control}
              touchedFields={touchedFields}
              errors={errors}
              setValue={setValue}
            />
          </div>
        </CustomSheet>
      </div>
    </form>
  );
};

export default BetForm;
