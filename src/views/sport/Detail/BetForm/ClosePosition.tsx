import { useDispatch } from 'react-redux';

import { Button } from '@/components';
import { AppDispatch } from '@/redux/store';
import { closeDialog } from '@/redux/features/dialogSlice';

interface Props {
  positionSize: string;
  fee: string;
  pnl: string;
}

const ClosePosition = ({ positionSize, fee, pnl }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const details = [
    { label: 'Position size', value: `$${positionSize}` },
    { label: 'Charged fee', value: `$${fee}` },
    { label: 'PNL', value: `$${pnl}` },
  ];

  const onClose = () => {
    dispatch(closeDialog());
  };

  return (
    <>
      <h3 className="text-base text-white font-medium text-center">Close position</h3>

      <ul className="mt-4">
        {details.map(({ value, label }, index) => (
          <li
            key={index}
            className="flex-between text-base [&:not(:last-child)]:text-white last:text-primary-300 font-medium [&:not(:last-child)]:border-b border-neutral-600 py-4"
          >
            <div>{label}</div>
            <div>{value}</div>
          </li>
        ))}
      </ul>

      <Button fullWidth size="md" radius="lg" className="mt-10" onClick={onClose}>
        Close position
      </Button>
    </>
  );
};

export default ClosePosition;
