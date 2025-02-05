import Link from 'next/link';
import { useEffect } from 'react';
import BigNumber from 'bignumber.js';

import { Button, Icon } from '@/components';
import humanizeAmount from '@/helpers/humanizeAmount';
import Links from '@/constants/links';

interface Props {
  claimAmount: number;
  onClaim: () => void;
  refetch: () => void;
}

const ClaimReward = ({ onClaim, refetch, claimAmount }: Props) => {
  useEffect(() => {
    refetch();
  }, []);

  const isClaimAmountZero = new BigNumber(claimAmount).isZero();

  return (
    <div className="text-center">
      <h6 className="text-md text-white">Reward to claim</h6>
      <h2 className="font-bold text-4xl text-white mt-2">
        <span className="bg-gradiant-text text-transparent bg-clip-text">
          {humanizeAmount(claimAmount)}{' '}
        </span>
        MONT
      </h2>

      <Button
        fullWidth
        className="mt-8"
        variant="primary"
        radius="lg"
        onClick={onClaim}
        disabled={isClaimAmountZero}
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
        <Link href={Links.GET_REWARD} target="_blank">
          How i get reward
          <Icon name="arrow-up-right" color="#ADADB6" />
        </Link>
      </Button>
    </div>
  );
};

export default ClaimReward;
