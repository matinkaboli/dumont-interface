import { useDispatch } from 'react-redux';

import { Button } from '@/components';
import { AppDispatch } from '@/redux/store';
import { closeDialog } from '@/redux/features/dialogSlice';

const details = [
  { label: 'Position size', value: '$4,000' },
  { label: 'Charged fee', value: '$600' },
  { label: 'PNL', value: '$3,400' },
];

const ClosePosition = () => {
  const dispatch = useDispatch<AppDispatch>();

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
