import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';
import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';

import { Confetti, Icon } from '@/components';
import { openDialog, updateDialogContent } from '@/redux/features/dialogSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import parseUnits from '@/helpers/parseUnits';
import MONT_REWARD_MANAGER_ABI from '@/abis/MONT_REWARD_MANAGER_ABI.json';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';

import ClaimReward from './ClaimReward';
import Claimed from './Claimed';

const RewardButton = () => {
  const dispatch = useDispatch();
  const [claimed, setClaimed] = useState(false);
  const { details } = useTypedSelector((state) => state.config);
  const { address } = useTypedSelector((state) => state.account.profile);

  const { data: balancesData, refetch: refetetchBalances } = useContractRead({
    address: details?.montRewardManager,
    abi: MONT_REWARD_MANAGER_ABI,
    functionName: 'balances',
    args: [address],
  });

  const {
    write: writeClaim,
    data: claimData,
    isLoading: isClaimLoading,
  } = useContractWrite({
    address: details?.montRewardManager,
    abi: MONT_REWARD_MANAGER_ABI,
    functionName: 'claim',
    onError: onError,
  });

  const { isLoading: isWaitClaimLoading } = useWaitForTransaction({
    chainId: details?.networkId,
    hash: claimData?.hash,
    onSuccess: onSuccess,
    onError: onError,
  });

  useEffect(() => {
    if (isClaimLoading || isWaitClaimLoading) {
      let title = isClaimLoading ? 'Sign the transaction' : 'Claiming the reward';
      let desc = isClaimLoading
        ? 'Sign this transaction in your wallet'
        : 'It will take a few seconds';

      dispatch(
        openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <AnimatedDialogContent key="loading">
              <LoadingContent title={title} desc={desc} />
            </AnimatedDialogContent>
          ),
        }),
      );
    }
  }, [isClaimLoading, isWaitClaimLoading]);

  function onClaim() {
    writeClaim?.();
  }

  function onSuccess() {
    setClaimed(true);

    const claimValue = parseUnits(balancesData as string, 18).toNumber();

    dispatch(
      openDialog({
        content: <Claimed amount={claimValue} />,
      }),
    );
  }

  function onError() {
    dispatch(
      openDialog({
        content: (
          <AnimatedDialogContent key="error">
            <ErrorContent title="Claim was unsuccessful" onClick={onClaim} />
          </AnimatedDialogContent>
        ),
      }),
    );
  }

  function onOpenDialog() {
    const initialValue = parseUnits(balancesData as BigNumber, 18);

    dispatch(
      openDialog({
        content: <ClaimReward claimValue={initialValue.toString()} onClaim={onClaim} />,
      }),
    );

    refetetchBalances().then((newBalance) => {
      if (balancesData !== newBalance.data) {
        const newValue = parseUnits(newBalance.data as BigNumber, 18);
        dispatch(
          updateDialogContent(<ClaimReward claimValue={newValue.toString()} onClaim={onClaim} />),
        );
      }
    });
  }

  return (
    <>
      <Confetti run={claimed} className="!z-[45]" />

      <div className="border-primary-gradiant rounded-lg">
        <button
          type="button"
          className="flex-center-v bg-primary-800 rounded-lg px-2 h-10"
          onClick={onOpenDialog}
        >
          <Icon name="gift-rainbow" />
        </button>
      </div>
    </>
  );
};

export default RewardButton;
