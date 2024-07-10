import { useDispatch } from 'react-redux';

import { Icon } from '@/components';
import { openDialog } from '@/redux/features/dialogSlice';

// import ClaimReward from './ClaimReward';
import Claimed from './Claimed';

const RewardButton = () => {
  const dispatch = useDispatch();
  const onOpenDialog = () =>
    dispatch(
      openDialog({
        content: <Claimed />,
      }),
    );

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
