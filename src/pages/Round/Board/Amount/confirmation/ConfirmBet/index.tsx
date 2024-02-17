import { Button } from '@/components';

import SelectedKey from './SelectedKey';
import BetDetailList from './BetDetailList';

const betDetails = [
  { label: 'Amount', value: '125 DAI' },
  { label: 'Overall odds', value: 'x3.4' },
  { label: 'Possible payout', value: '$220' },
];

const ConfirmBet = () => {
  return (
    <>
      <h3 className="text-md text-white font-medium">Confirm your bet</h3>
      <h6 className="text-base text-white font-medium mt-6">Selection</h6>
      <div className="flex gap-2 mt-4">
        <SelectedKey>7</SelectedKey>
        <SelectedKey>K</SelectedKey>
      </div>

      <BetDetailList className="mt-4 mb-10" items={betDetails} />

      <Button fullWidth size="md" radius="lg">
        Confirm
      </Button>
    </>
  );
};

export default ConfirmBet;
