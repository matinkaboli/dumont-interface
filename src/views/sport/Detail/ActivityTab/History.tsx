import Image from 'next/image';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components';

const history = [
  {
    id: '1',
    team: 'Real Madrid',
    logo: '/images/teams/real-madrid.svg',
    size: '$3,000',
    entryPrice: '0.6',
    liquidationPrice: '0.5',
    chargedFee: '$400',
    pnl: -500,
    leverage: '10x',
  },
  {
    id: '2',
    team: 'Barcelona',
    logo: '/images/teams/barcelona.svg',
    size: '$2,000',
    entryPrice: '0.4',
    liquidationPrice: '0.5',
    chargedFee: '$300',
    pnl: 500,
    leverage: '5x',
  },
  {
    id: '3',
    team: 'Porto',
    logo: '/images/teams/porto.svg',
    size: '$1,500',
    entryPrice: '0.2',
    liquidationPrice: '0.3',
    chargedFee: '$600',
    pnl: -500,
    leverage: '8x',
  },
];

const History = () => {
  return (
    <Table className="text-white">
      <TableHeader>
        <TableRow className="uppercase text-neutral-400 text-xs font-medium">
          <TableHead>Team</TableHead>
          <TableHead>Position Size</TableHead>
          <TableHead>Entry Odds</TableHead>
          <TableHead>Liquidation Threshold</TableHead>
          <TableHead>Charged Fee</TableHead>
          <TableHead>PNL</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map(
          ({ id, team, logo, size, entryPrice, liquidationPrice, chargedFee, pnl, leverage }) => (
            <TableRow key={id}>
              <TableCell className="flex items-center gap-2 pr-6">
                <Image
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full"
                  src={logo}
                  alt={team}
                />
                <span className="text-neutral-300 font-medium text-sm">{team}</span>
                <span className="bg-neutral-750 rounded-full px-2 py-0.5 text-xs text-white font-medium">
                  {leverage}
                </span>
              </TableCell>
              <TableCell className="text-neutral-300">{size}</TableCell>
              <TableCell className="text-neutral-300">{entryPrice}</TableCell>
              <TableCell className="text-neutral-300">{liquidationPrice}</TableCell>
              <TableCell className="text-neutral-300">{chargedFee}</TableCell>
              <TableCell className="text-neutral-300">{pnl > 0 ? `+${pnl}` : pnl}</TableCell>
              <TableCell>
                <button
                  type="button"
                  className="text-neutral-500"
                  aria-label={`Close position for ${team}`}
                >
                  Cancel
                </button>
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};

export default History;
