'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { encodeFunctionData } from 'viem';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';
import { useWaitForTransactionReceipt } from 'wagmi';
import { toast } from 'react-toastify';

import { AppDispatch } from '@/redux/store';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { Outcome } from '@/constants/static';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import ERC20_ABI from '@/abis/ERC20_ABI.json';
import GATEWAY_ABI from '@/abis/GATEWAY_ABI.json';
import formatUnits from '@/helpers/formatUnits';
import { Odds } from '@/types/match';

import BetButton from '@/views/_components/BetButton';
import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import CustomSheet from '@/views/_components/CustomSheet';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';
import {
  getFeePerMinute,
  getLiquidationThreshold,
  getTotalSize,
} from '@/views/sport/Detail/helpers';

import AmountControls from './AmountControls';
import PlaceBet from './PlaceBet';
import { ToastContent, ToastWrapper } from '@/components';

export interface SportFormData {
  amount: string;
  outcome: number;
  multiplier: number;
}

export interface BetDetails {
  totalSize: number;
  feePerMinute: number;
  liquidationPrice: number;
  selectedTeamOdds: number;
}

export type OutcomeLabel = 'home' | 'away' | 'draw';

interface Props {
  matchId: string;
  odds?: Odds;
  isDisable?: boolean;
}

const defaultMultiplierValue = 2;

const BetForm = ({ matchId, odds, isDisable = false }: Props) => {
  const { client } = useSmartWallets();
  const dispatch = useDispatch<AppDispatch>();
  const { details } = useTypedSelector((state) => state.config);
  const [isExpanded, setIsExpanded] = useState(false);
  const [openPositionTx, setOpenPositionTx] = useState('');
  const [isCreatePositionLoading, setIsCreatePositionLoading] = useState(false);
  const [betDetails, setBetDetails] = useState<BetDetails>({
    totalSize: 0,
    feePerMinute: 0,
    liquidationPrice: 0,
    selectedTeamOdds: 0,
  });

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    resetField,
    formState: { errors, touchedFields },
  } = useForm<SportFormData>({
    mode: 'onChange',
    defaultValues: {
      amount: '',
      outcome: Outcome.Home,
      multiplier: defaultMultiplierValue,
    },
  });

  const { isLoading: isWaitTXLoading, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: openPositionTx as `0x${string}`,
  });

  const amount = watch('amount');
  const multiplier = watch('multiplier');
  const outcome = watch('outcome');

  useEffect(() => {
    if (amount && +amount > 0) {
      const totalSize = getTotalSize(+amount, multiplier);
      const feePerMinute = getFeePerMinute(+amount, multiplier);
      const selectedTeam = Outcome[outcome].toLowerCase() as OutcomeLabel;
      const liquidationPrice = odds ? getLiquidationThreshold(odds[selectedTeam], multiplier) : 0;

      setBetDetails({
        totalSize,
        feePerMinute,
        liquidationPrice,
        selectedTeamOdds: odds ? odds[selectedTeam] : 0,
      });
    }
  }, [amount, multiplier, outcome, odds]);

  useEffect(() => {
    if (isWaitTXLoading || isCreatePositionLoading) {
      dispatch(
        openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <AnimatedDialogContent key="loading">
              <LoadingContent title="Waiting for the network" desc="It will take a few seconds" />
            </AnimatedDialogContent>
          ),
        }),
      );
    }
  }, [isWaitTXLoading, isCreatePositionLoading]);

  useEffect(() => {
    if (isConfirmed) {
      dispatch(closeDialog());
      toast(
        <ToastWrapper>
          <ToastContent
            variant="success"
            title="Position Opened Successfully"
            description="You’re all set — good luck!"
          />
        </ToastWrapper>,
        { position: 'bottom-right', toastId: 'success' },
      );
    }
  }, [isConfirmed]);

  const onOpenPosition = async (data: SportFormData) => {
    if (!client) return;

    const { amount, multiplier, outcome } = data;
    const formattedAmount = formatUnits(amount, 6).toNumber();
    const formattedMultiplier = formatUnits(`${multiplier}`, 3).toNumber();

    try {
      setIsCreatePositionLoading(true);

      const tx = await client.sendTransaction({
        account: client.account,
        calls: [
          {
            to: details!.usdc,
            data: encodeFunctionData({
              abi: ERC20_ABI,
              functionName: 'approve',
              args: [details!.gateway, formattedAmount],
            }),
          },
          {
            to: details!.gateway,
            data: encodeFunctionData({
              abi: GATEWAY_ABI,
              functionName: 'createPosition',
              args: [matchId, formattedAmount, formattedMultiplier, outcome],
            }),
          },
        ],
      });

      setOpenPositionTx(tx);
    } catch (error) {
      dispatch(
        openDialog({
          content: (
            <AnimatedDialogContent key="error">
              <ErrorContent title="Something went wrong!" />
            </AnimatedDialogContent>
          ),
        }),
      );
    } finally {
      setIsCreatePositionLoading(false);
    }
  };

  const onSubmit = (data: SportFormData) => {
    setIsExpanded(false);

    dispatch(
      openDialog({
        dialogProps: { className: '!pt-6', closeButtonClassName: '!top-[23px]' },
        content: (
          <PlaceBet
            outcome={outcome}
            multiplier={data.multiplier}
            fee={betDetails.feePerMinute}
            positionSize={betDetails.totalSize}
            entryPrice={betDetails.selectedTeamOdds}
            liquidationPrice={betDetails.liquidationPrice}
            onConfirm={() => onOpenPosition(data)}
          />
        ),
      }),
    );
  };

  const onExpandDetail = () => {
    if (!isExpanded) setIsExpanded(true);
  };

  const onCloseDetail = () => {
    setIsExpanded(false);
    resetField('amount');
  };

  return (
    <div className="relative">
      {isDisable && (
        <div className="absolute inset-0 bg-primary-900/40 z-10 cursor-not-allowed rounded-xl" />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        {/* Desktop View */}
        <div className="h-full md:flex hidden flex-col justify-between bg-primary-900 bordr-[1.5px] border-primary-700 rounded-lg col-span-1 p-4">
          <AmountControls
            control={control}
            touchedFields={touchedFields}
            errors={errors}
            setValue={setValue}
            defaultMultiplierValue={defaultMultiplierValue}
            betDetails={betDetails}
            isDisable={isDisable}
          />
          <BetButton
            label="Open position"
            disabledButtonLabel="Open Position"
            disabled={isDisable}
          />
        </div>

        {/* Mobile View */}
        <div className="md:hidden block text-white">
          <CustomSheet
            isExpanded={isExpanded}
            onClose={onCloseDetail}
            buttonElement={
              <BetButton
                size="md"
                label="Open position"
                type={isExpanded ? 'submit' : 'button'}
                disabledButtonLabel="Open Position"
                onClick={onExpandDetail}
                disabled={isDisable}
              />
            }
          >
            <div className="flex flex-col gap-4 pt-6 pb-10">
              <AmountControls
                control={control}
                touchedFields={touchedFields}
                errors={errors}
                setValue={setValue}
                defaultMultiplierValue={defaultMultiplierValue}
                betDetails={betDetails}
                isDisable={isDisable}
              />
            </div>
          </CustomSheet>
        </div>
      </form>
    </div>
  );
};

export default BetForm;
