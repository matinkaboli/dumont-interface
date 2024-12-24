import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { encodeFunctionData } from 'viem';
import { useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';

import { Icon } from '@/components';
import { closeDialog, openDialog, updateDialogContent } from '@/redux/features/dialogSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import humanizeAmount from '@/helpers/humanizeAmount';
import AIRDROP_ABI from '@/abis/AIRDROP_ABI.json';
import { showConfetti } from '@/redux/features/confettiSlice';
import parseUnits from '@/helpers/parseUnits';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';

import ClaimAirdrop from './ClaimAirdrop';
import Claimed from '../Claimed';

const AirdropButton = () => {
  const dispatch = useDispatch();
  const { details } = useTypedSelector((state) => state.config);
  const { isAirdropEligible } = useTypedSelector((state) => state.account);
  const { client } = useSmartWallets();
  const { address } = useTypedSelector((state) => state.account.profile);
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [claimTx, setClaimTx] = useState('');

  const { refetch: refetetchAirdrop } = useReadContract({
    address: details?.airdrop,
    abi: AIRDROP_ABI,
    functionName: 'claimers',
    args: [address],
  });

  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: claimTx as `0x${string}`,
  });

  const onClaim = async () => {
    dispatch(closeDialog());

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
              <ErrorContent title="Something went wrong" />
            </AnimatedDialogContent>
          ),
        }),
      );
    }
    setIsClaimLoading(false);
  };

  useEffect(() => {
    if (isConfirmed) {
      dispatch(showConfetti({}));

      const claimValue = parseUnits(isAirdropEligible, 18).toNumber();

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

  function onOpenDialog() {
    const initialValue = parseUnits(isAirdropEligible, 18).toNumber();

    dispatch(
      openDialog({
        content: (
          <ClaimAirdrop claimValue={humanizeAmount(initialValue).toString()} onClaim={onClaim} />
        ),
      }),
    );

    refetetchAirdrop().then((newBalance) => {
      if (isAirdropEligible !== newBalance.data) {
        const newValue = parseUnits(newBalance.data as BigNumber, 18).toNumber();

        dispatch(
          updateDialogContent(<ClaimAirdrop claimValue={humanizeAmount(newValue).toString()} onClaim={onClaim} />),
        );
      }
    });
  }

  return (
    <div className="border-primary-gradiant rounded-lg">
      <button
        type="button"
        onClick={onOpenDialog}
        disabled={isClaimLoading}
        className="flex-center bg-primary-800 rounded-lg w-10 h-10"
      >
        <Icon name="air-balloon-rainbow" />
      </button>
    </div>
  );
};

export default AirdropButton;
