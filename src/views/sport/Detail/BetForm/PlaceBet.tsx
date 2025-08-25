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

const TeamDisplay = ({
  team,
  outcome,
  multiplier,
}: {
  team?: Team;
  outcome: number;
  multiplier: number;
}) => {
  const isDraw = Outcome[outcome] === 'Draw';

  return (
    <div className="flex items-center gap-2">
      <Image
        src={isDraw ? '/images/draw.png' : team!.logo}
        alt={isDraw ? 'Draw' : team!.name}
        width={24}
        height={24}
        className="h-6 w-auto"
      />
      <span>{isDraw ? 'Draw' : team!.name}</span>
      <span className="bg-neutral-600 rounded-full px-2 py-0.5 text-xs font-medium text-white">
        {multiplier}x
      </span>
    </div>
  );
};

const PlaceBet = ({
  outcome,
  entryPrice,
  liquidationPrice,
  positionSize,
  multiplier,
  onConfirm,
}: Props) => {
  const { match } = useTypedSelector((state) => state.match.main);

  const selectedKey = Outcome[outcome]?.toLowerCase();
  const team: Team | undefined = match
    ? (match[`${selectedKey}Team` as keyof typeof match] as Team)
    : undefined;

  const entryPriceText = (entryPrice / 100).toFixed(2);
  const liquidationPriceText = (liquidationPrice / 100).toFixed(2);

  const details = [
    { label: 'Outcome', render: TeamDisplay({ team, outcome, multiplier }) },
    { label: 'Entry price', value: `$${entryPriceText}` },
    { label: 'Liquidation price', value: `$${liquidationPriceText}` },
    // {
    //   label: 'Fee per min',
    //   value: `${FEE_PER_SECOND * 100 * 60}%`,
    //   tooltip:
    //     'This is the funding fee charged on the borrowed amount. It accrues at 3.75% per minute when using leverage. Positions are liquidated automatically if fees exceed your equity.',
    // },
    { label: 'Position size', value: `$${positionSize.toFixed(2)}` },
  ];

  return (
    <>
      <h3 className="text-base text-white font-medium text-center">Open position</h3>
      <ul className="mt-6">
        {details.map(({ label, value, render }, index) => (
          <li
            key={index}
            className="flex-between text-base text-white font-medium [&:not(:last-child)]:border-b border-neutral-600 py-4"
          >
            <span>{label}</span>
            <span>{render || value}</span>
          </li>
        ))}
      </ul>

      <Button fullWidth size="md" radius="lg" className="mt-10" onClick={onConfirm}>
        Open Position
      </Button>
    </>
  );
};

export default PlaceBet;
