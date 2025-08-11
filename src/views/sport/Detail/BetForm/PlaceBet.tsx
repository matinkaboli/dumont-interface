import Image from 'next/image';

import { Button } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Outcome } from '@/constants/static';
import { Team } from '@/types/match';

interface Props {
  entryPrice: number;
  liquidationPrice: number;
  positionSize: number;
  fee: number;
  outcome: number;
  multiplier: number;
  onConfirm: () => void;
}

const TeamDisplay = ({ team, outcome, multiplier }: { team?: Team, outcome: number, multiplier: number }) => {
  const baseClass = 'flex items-center gap-2';

  if (Outcome[outcome] === 'Draw') {
    return (
      <div className={baseClass}>
        <Image
          src='/images/draw.png'
          alt='Draw'
          width={24}
          height={24}
          className='h-6 w-auto'
        />
        <span>Draw</span>
      </div>
    );
  }

  return (
    <div className={baseClass}>
      <Image
        src={team!.logo}
        alt={team!.name || 'Team logo'}
        width={24}
        height={24}
        className='h-6 w-auto'
      />
      <span>{team!.name}</span>
      <span className='bg-neutral-600 rounded-full px-2 py-0.5 text-xs font-medium text-white'>
        {multiplier}x
      </span>
    </div>
  );
};

const PlaceBet = ({ outcome, entryPrice, liquidationPrice, positionSize, fee, multiplier, onConfirm }: Props) => {
  const { match } = useTypedSelector((state) => state.match.main);

  const selectedKey = Outcome[outcome]?.toLowerCase();
  const team: Team | undefined = match ? (match[`${selectedKey}Team` as keyof typeof match] as Team) : undefined;

  const details = [
    { label: 'Team', render: TeamDisplay({ team, outcome, multiplier }) },
    { label: 'Entry Odds', value: `${entryPrice.toFixed(2)}%` },
    { label: 'Liquidation Price', value: `${liquidationPrice.toFixed(2)}%` },
    { label: 'Fee per min', value: `$${fee.toFixed(2)}` },
    { label: 'Total size', value: `$${positionSize.toFixed(2)}` },
  ];

  return (
    <>
      <h3 className='text-base text-white font-medium text-center'>Open Position</h3>
      <ul className='mt-6'>
        {details.map(({ label, value, render }, index) => (
          <li
            key={index}
            className='flex-between text-base text-white font-medium [&:not(:last-child)]:border-b border-neutral-600 py-4'
          >
            <span>{label}</span>
            <span>{render || value}</span>
          </li>
        ))}
      </ul>

      <Button fullWidth size='md' radius='lg' className='mt-10' onClick={onConfirm}>
        Open Position
      </Button>
    </>
  );
};

export default PlaceBet;
