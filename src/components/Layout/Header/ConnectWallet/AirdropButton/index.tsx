import { useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { encodeFunctionData } from 'viem';
import { useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';

import { Icon } from '@/components';
import { openDialog } from '@/redux/features/dialogSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import AIRDROP_ABI from '@/abis/AIRDROP_ABI.json';
import { showConfetti } from '@/redux/features/confettiSlice';
import parseUnits from '@/helpers/parseUnits';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';

import ClaimAirdrop from './ClaimAirdrop';
import Claimed from '../Claimed';

const AirdropButton = () => {
  const dispatch = useDispatch();
  const { client } = useSmartWallets();
  const { details } = useTypedSelector((state) => state.config);
  const { address } = useTypedSelector((state) => state.account.profile);
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [claimTx, setClaimTx] = useState('');

  const { data: isAirdropEligible, refetch } = useReadContract({
    address: details?.airdrop,
    abi: AIRDROP_ABI,
    functionName: 'claimers',
    args: [address],
    query: {
      refetchInterval: 15000,
    }
  });

  const claimValue = useMemo(
    () => parseUnits(isAirdropEligible as string, 18).toNumber(),
    [isAirdropEligible],
  );

  const { isLoading: isWaitTXLoading, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: claimTx as `0x${string}`,
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

      dispatch(
        openDialog({
          content: (
            <AnimatedDialogContent key="claimed">
              <Claimed refetch={refetch} amount={claimValue} />
            </AnimatedDialogContent>
          ),
        }),
      );
    }
  }, [isConfirmed]);

  const onOpenDialog = () => {
    dispatch(
      openDialog({
        content: <ClaimAirdrop claimAmount={claimValue} refetch={refetch} onClaim={onClaim} />,
      }),
    );
  };

  const onClaim = async () => {
    setIsClaimLoading(true);
    setClaimTx('');

    if (!client) return;

    try {
      const tx = await client.sendTransaction({
        account: client.account,
        calls: [
          {
            to: details!.airdrop,
            data: encodeFunctionData({
              abi: AIRDROP_ABI,
              functionName: 'claim',
            }),
          },
        ],
      });
      setClaimTx(tx);
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
    }
    setIsClaimLoading(false);
  };

  return (
    <div className="border-primary-gradiant rounded-lg">
      <button
        type="button"
        onClick={onOpenDialog}
        disabled={isClaimLoading || isWaitTXLoading}
        className="flex-center bg-primary-800 rounded-lg w-10 h-10"
      >
        {claimValue === 0 ? (
          <Icon name="air-balloon" color="#821182" />
        ) : (
          <Icon name="air-balloon-rainbow" />
        )}
      </button>
    </div>
  );
};

export default AirdropButton;
