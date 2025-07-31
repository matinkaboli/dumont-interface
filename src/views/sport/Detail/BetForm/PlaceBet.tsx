import Image from 'next/image';

import { Button } from '@/components';
import formatDecimal from '@/helpers/formatDecimal';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Outcome } from '@/constants/static';
import { Team } from '@/types/match';

interface Props {
  entryPrice: string;
  liquidationPrice: number;
  positionSize: number;
  fee: number;
  outcome: number;
  onConfirm: () => void;
}

const PlaceBet = ({ outcome, entryPrice, liquidationPrice, positionSize, fee, onConfirm }: Props) => {
  const { match } = useTypedSelector((state) => state.match.main);

  const selectedKey = Outcome[outcome]?.toLowerCase();
  const team: Team | undefined = match ? (match[`${selectedKey}Team` as keyof typeof match] as Team) : undefined;


  const details = [
    {
      label: 'Team',
      render: team && (
        <div className="flex items-center gap-2">
          <Image
            src={team.logo}
            alt={team.name || 'Team logo'}
            width={24}
            height={24}
            className="h-6 w-auto"
          />
          <span>{team.name}</span>
          <span className="bg-neutral-600 rounded-full px-2 py-0.5 text-xs font-medium text-white">
            10x
          </span>
        </div>
      ),
    },
    { label: 'Entry price', value: entryPrice },
    { label: 'Liquidation price', value: `%${formatDecimal({ amount: liquidationPrice, decimalPlaces: 2 })}` },
    { label: 'Position size', value: `$${formatDecimal({ amount: positionSize, decimalPlaces: 2 })}` },
    { label: 'Fee per minute', value: `$${formatDecimal({ amount: fee, decimalPlaces: 2 })}` },
  ];

  return (
    <>
      <h3 className='text-base text-white font-medium text-center'>Place bet</h3>
      <ul className='mt-4'>
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
        Bet
      </Button>
    </>
  );
};

export default PlaceBet;
