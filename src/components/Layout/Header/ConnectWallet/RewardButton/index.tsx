import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { encodeFunctionData } from 'viem';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';
import { useReadContract, useWaitForTransactionReceipt } from 'wagmi';

import { Icon } from '@/components';
import { openDialog } from '@/redux/features/dialogSlice';
import { showConfetti } from '@/redux/features/confettiSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import parseUnits from '@/helpers/parseUnits';
import MONT_REWARD_MANAGER_ABI from '@/abis/MONT_REWARD_MANAGER_ABI.json';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';

import ClaimReward from './ClaimReward';
import Claimed from '../Claimed';

const RewardButton = () => {
  const dispatch = useDispatch();
  const { client } = useSmartWallets();
  const { details } = useTypedSelector((state) => state.config);
  const { address } = useTypedSelector((state) => state.account.profile);
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [rewardTx, setRewardTx] = useState('');

  const { data: balancesData } = useReadContract({
    address: details?.montRewardManager,
    abi: MONT_REWARD_MANAGER_ABI,
    functionName: 'balances',
    args: [address],
  });

  const { isLoading: isWaitTXLoading, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: rewardTx as `0x${string}`,
  });

  useEffect(() => {
    if (isClaimLoading || isWaitTXLoading) {
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
  }, [isClaimLoading, isWaitTXLoading]);

  useEffect(() => {
    if (isConfirmed) {
      dispatch(showConfetti({}));
      const claimValue = parseUnits(balancesData as string, 18).toNumber();

      dispatch(
        openDialog({
          content: (
            <AnimatedDialogContent key="claimed">
              <Claimed amount={claimValue} />
            </AnimatedDialogContent>
          ),
        }),
      );
    }
  }, [isConfirmed]);

  const onOpenDialog = () => {
    dispatch(
      openDialog({
        content: <ClaimReward onClaim={onClaimReward} />,
      }),
    );
  };

  const onClaimReward = async () => {
    setIsClaimLoading(true);
    setRewardTx('');

    if (!client) return;

    try {
      const tx = await client.sendTransaction({
        account: client.account,
        calls: [
          {
            to: details!.montRewardManager,
            data: encodeFunctionData({
              abi: MONT_REWARD_MANAGER_ABI,
              functionName: 'claim',
            }),
          },
        ],
      });
      setRewardTx(tx);
    } catch (error) {
      dispatch(
        openDialog({
          content: (
            <AnimatedDialogContent key="error">
              <ErrorContent title="Something went wrong" />
            </AnimatedDialogContent>
          ),
        }),
      );
    }
    setIsClaimLoading(false);
  };

  return (
    <div className="border-primary-gradiant rounded-lg">
      <button
        type="button"
        className="flex-center-v bg-primary-800 rounded-lg px-2 h-10"
        onClick={onOpenDialog}
        disabled={isClaimLoading || isWaitTXLoading}
      >
        <Icon name="gift-rainbow" />
      </button>
    </div>
  );
};
export default RewardButton;
