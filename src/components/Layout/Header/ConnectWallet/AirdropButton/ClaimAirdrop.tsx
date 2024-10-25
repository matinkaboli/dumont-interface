import Link from 'next/link';
import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { Button, Icon } from '@/components';
import { AppDispatch } from '@/redux/store';
import { showConfetti } from '@/redux/features/confettiSlice';
import AIRDROP_ABI from '@/abis/AIRDROP_ABI.json';
import humanizeAmount from '@/helpers/humanizeAmount';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import links from '@/constants/links';

import ErrorContent from '@/views/_components/Dialog/ErrorContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';
import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';

import Claimed from '../RewardButton/Claimed';

const ClaimAirdrop = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { details } = useTypedSelector((state) => state.config);
  const { isAirdropEligible } = useTypedSelector((state) => state.account);

  const claimableAmount = new BigNumber(isAirdropEligible).div(10 ** 18);
  const claimableAmountHumanized = humanizeAmount(claimableAmount.toString());

  const {
    writeContract: writeClaim,
    data: claimData,
    isPending: isClaimLoading,
    isError: isWriteClaimError,
  } = useWriteContract();

  const {
    isLoading: isWaitClaimLoading,
    isSuccess: isConfirmed,
    isError: isWaitClaimError,
  } = useWaitForTransactionReceipt({
    hash: claimData,
  });

  const handleClick = () => {
    writeClaim?.({
      address: details!.airdrop,
      abi: AIRDROP_ABI,
      functionName: 'claim',
    });
  };

  if (isWaitClaimError || isWriteClaimError) {
    return (
      <AnimatedDialogContent key="error">
        <ErrorContent title="Claim was unsuccessful" onClick={handleClick} />
      </AnimatedDialogContent>
    );
  }

  if (isWaitClaimLoading || isClaimLoading) {
    let title = isClaimLoading ? 'Sign the transaction' : 'Claiming the reward';
    let desc = isClaimLoading
      ? 'Sign this transaction in your wallet'
      : 'It will take a few seconds';

    return (
      <AnimatedDialogContent key="loading">
        <LoadingContent title={title} desc={desc} />
      </AnimatedDialogContent>
    );
  }

  if (isConfirmed) {
    dispatch(showConfetti({}));
    return <Claimed amount={100000} />;
  }

  return (
    <div className="text-center">
      <h6 className="text-md text-white">Claim your airdrop</h6>
      <h2 className="font-bold text-4xl text-white mt-2">
        <span className="bg-gradiant-text text-transparent bg-clip-text">
          {claimableAmountHumanized}
        </span>{' '}
        MONT
      </h2>

      <Button
        fullWidth
        className="mt-8"
        variant="primary"
        radius="lg"
        disabled={claimableAmountHumanized === '0'}
        onClick={handleClick}
      >
        Claim
      </Button>
      <Button
        asChild
        fullWidth
        variant="link"
        radius="lg"
        className="text-neutral-400 font-semibold text-base mt-4 !px-0 hover:bg-neutral-600"
      >
        <Link href={links.AIRDROP} target="_blank">
          How to qualify for airdrop
          <Icon name="arrow-up-right" color="#ADADB6" />
        </Link>
      </Button>
    </div>
  );
};

export default ClaimAirdrop;
