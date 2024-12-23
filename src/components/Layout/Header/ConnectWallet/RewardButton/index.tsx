import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';
import { encodeFunctionData } from 'viem';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';
import { useReadContract, useWaitForTransactionReceipt } from 'wagmi';

import { Icon } from '@/components';
import { closeDialog, openDialog, updateDialogContent } from '@/redux/features/dialogSlice';
import { showConfetti } from '@/redux/features/confettiSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import parseUnits from '@/helpers/parseUnits';
import MONT_REWARD_MANAGER_ABI from '@/abis/MONT_REWARD_MANAGER_ABI.json';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';

import ClaimReward from './ClaimReward';
import Claimed from './Claimed';

const RewardButton = () => {
  const dispatch = useDispatch();
  const { client } = useSmartWallets();
  const [claimed, setClaimed] = useState(false);
  const { details } = useTypedSelector((state) => state.config);
  const { address } = useTypedSelector((state) => state.account.profile);
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [rewardTx, setRewardTx] = useState('');

  const { data: balancesData, refetch: refetetchBalances } = useReadContract({
    address: details?.montRewardManager,
    abi: MONT_REWARD_MANAGER_ABI,
    functionName: 'balances',
    args: [address],
  });

  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: rewardTx as `0x${string}`,
  });

  useEffect(() => {
    if (isConfirmed) {
      setClaimed(true);

      const claimValue = parseUnits(balancesData as string, 18).toNumber();

      dispatch(
        openDialog({
          content: <Claimed amount={claimValue} />,
        }),
      );
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (claimed) dispatch(showConfetti({ confettiProps: { onConfettiComplete } }));
  }, [claimed]);

  const onConfettiComplete = () => setClaimed(false);

  const onOpenDialog = () => {
    const initialValue = parseUnits(balancesData as BigNumber, 18);

    dispatch(
      openDialog({
        content: <ClaimReward claimValue={initialValue.toString()} onClaim={onClaimReward} />,
      }),
    );

    refetetchBalances().then((newBalance) => {
      if (balancesData !== newBalance.data) {
        const newValue = parseUnits(newBalance.data as BigNumber, 18);
        dispatch(
          updateDialogContent(
            <ClaimReward claimValue={newValue.toString()} onClaim={onClaimReward} />,
          ),
        );
      }
    });
  };

  const onClaimReward = async () => {
    dispatch(closeDialog());

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
        disabled={isClaimLoading}
      >
        <Icon name="gift-rainbow" />
      </button>
    </div>
  );
};
export default RewardButton;
