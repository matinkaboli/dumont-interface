import Image from 'next/image';

import { Button } from '@/components';

interface Props {
  team: string;
  entryPrice: string;
  liquidationPrice: string;
  positionSize: string;
  fee: string;
  onConfirm: () => void;
}

const PlaceBet = ({ team, entryPrice, liquidationPrice, positionSize, fee, onConfirm }: Props) => {
  const details = [
    { label: 'Team', value: team, logo: '/images/teams/real-madrid.svg', leverage: '10x' },
    { label: 'Entry price', value: entryPrice },
    { label: 'Liquidation price', value: liquidationPrice },
    { label: 'Position size', value: `$${positionSize}` },
    { label: 'Fee per minute', value: `$${fee}` },
  ];

  return (
    <>
      <h3 className="text-base text-white font-medium text-center">Place bet</h3>
      <ul className="mt-4">
        {details.map(({ label, value, logo, leverage }, index) => (
          <li
            key={index}
            className="flex-between text-base text-white font-medium [&:not(:last-child)]:border-b border-neutral-600 py-4"
          >
            <div>{label}</div>
            <div>
              {logo ? (
                <div className="flex-center gap-1">
                  <Image width={18} height={24} src={logo} alt={value} />
                  <div>{value}</div>
                  <div className="bg-neutral-600 rounded-full px-2 py-0.5 text-xs text-white font-medium">
                    {leverage}
                  </div>
                </div>
              ) : (
                value
              )}
            </div>
          </li>
        ))}
      </ul>

      <Button fullWidth size="md" radius="lg" className="mt-10" onClick={onConfirm}>
        Bet
      </Button>
    </>
  );
};

export default PlaceBet;
