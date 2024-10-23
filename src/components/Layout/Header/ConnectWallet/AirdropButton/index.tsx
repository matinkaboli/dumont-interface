import { useDispatch } from 'react-redux';

import { Icon } from '@/components';
import { openDialog } from '@/redux/features/dialogSlice';

import ClaimAirdrop from './ClaimAirdrop';

const AirdropButton = () => {
  const dispatch = useDispatch();

  function onOpenDialog() {
    dispatch(
      openDialog({
        content: <ClaimAirdrop />,
      }),
    );
  }

  return (
    <div className="border-primary-gradiant rounded-lg">
      <button
        type="button"
        onClick={onOpenDialog}
        className="flex-center bg-primary-800 rounded-lg w-10 h-10"
      >
        <Icon name="air-balloon-rainbow" />
      </button>
    </div>
  );
};

export default AirdropButton;
