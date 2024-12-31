import Link from 'next/link';
import BigNumber from 'bignumber.js';
import { useReadContract } from 'wagmi';

import { Button, Icon } from '@/components';
import links from '@/constants/links';
import AIRDROP_ABI from '@/abis/AIRDROP_ABI.json';
import parseUnits from '@/helpers/parseUnits';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const ClaimAirdrop = ({ onClaim }: { onClaim: () => void }) => {
  const { details } = useTypedSelector((state) => state.config);
  const { address } = useTypedSelector((state) => state.account.profile);

  const { data: balancesData } = useReadContract({
    address: details?.airdrop,
    abi: AIRDROP_ABI,
    functionName: 'claimers',
    args: [address],
  });

  const claimAmount = parseUnits(balancesData as string, 18).toNumber();
  const isClaimAmountZero = new BigNumber(claimAmount).isZero();

  return (
    <div className="text-center">
      <h6 className="text-md text-white">Claim your airdrop</h6>
      <h2 className="font-bold text-4xl text-white mt-2">
        <span className="bg-gradiant-text text-transparent bg-clip-text">{claimAmount}</span> MONT
      </h2>

      <Button
        fullWidth
        className="mt-8"
        variant="primary"
        radius="lg"
        disabled={isClaimAmountZero}
        onClick={onClaim}
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
