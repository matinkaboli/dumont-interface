import { Button } from '@/components';

interface Props {
  positionSize: number;
  fee: number;
  pnl: number;
  onClosePosition: () => void;
}

const ClosePositionModal = ({ positionSize, fee, pnl, onClosePosition }: Props) => {
  const details = [
    { label: 'Position size', value: `${positionSize.toFixed(2)}` },
    { label: 'Charged fee', value: `$${fee.toFixed(2)}` },
    { label: 'PNL', value: `$${pnl.toFixed(2)}` },
  ];

  return (
    <>
      <h3 className='text-base text-white font-medium text-center'>Close position</h3>

      <ul className='mt-6'>
        {details.map(({ value, label }, index) => (
          <li
            key={index}
            className='flex-between text-base [&:not(:last-child)]:text-white last:text-primary-300 font-medium [&:not(:last-child)]:border-b border-neutral-600 py-4'
          >
            <div>{label}</div>
            <div>{value}</div>
          </li>
        ))}
      </ul>

      <Button fullWidth size='md' radius='lg' className='mt-10' onClick={onClosePosition}>
        Close position
      </Button>
    </>
  );
};

export default ClosePositionModal;
