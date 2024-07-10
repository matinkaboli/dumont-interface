import { useDispatch } from 'react-redux';
import { useContractRead } from 'wagmi';

import { Icon } from '@/components';
import { openDialog } from '@/redux/features/dialogSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import parseUnits from '@/helpers/parseUnits';
import MONT_REWARD_MANAGER_ABI from '@/abis/MONT_REWARD_MANAGER_ABI.json';

import ClaimReward from './ClaimReward';

const RewardButton = () => {
  const dispatch = useDispatch();
  const { details } = useTypedSelector((state) => state.config);
  const { address } = useTypedSelector((state) => state.account.profile);

  const { data: balancesData } = useContractRead({
    address: details?.montRewardManager,
    abi: MONT_REWARD_MANAGER_ABI,
    functionName: 'balances',
    args: [address],
  });

  const onOpenDialog = () => {
    const claimValue = parseUnits(balancesData as string, 18).toNumber();

    dispatch(
      openDialog({
        content: <ClaimReward claimValue={claimValue} />,
      }),
    );
  };

  return (
    <div className="border-primary-gradiant rounded-lg">
      <button
        type="button"
        className="flex-center-v bg-primary-800 rounded-lg px-2 h-10"
        onClick={onOpenDialog}
      >
        <Icon name="gift-rainbow" />
      </button>
    </div>
  );
};

export default RewardButton;
