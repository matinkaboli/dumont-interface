import Image from 'next/image';

import { Icon, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components';

const positions = [
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

const ClosedPosition = () => {
  return (
    <Table className='text-white'>
      <TableHeader>
        <TableRow className='uppercase text-neutral-400 text-xs font-medium'>
          <TableHead>Outcome</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Entry%</TableHead>
          <TableHead>Exit%</TableHead>
          <TableHead>Liquid%</TableHead>
          <TableHead>Fee</TableHead>
          <TableHead>PNL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {positions.map(
          ({ id, team, logo, size, entryPrice, liquidationPrice, chargedFee, pnl, leverage }) => (
            <TableRow key={id}>
              <TableCell className='flex items-center gap-2 pr-6'>
                <Image
                  width={24}
                  height={24}
                  className='h-6 w-6 rounded-full'
                  src={logo}
                  alt={team}
                />
                <span className='text-neutral-300 font-medium text-sm'>{team}</span>
                <span className='bg-neutral-750 rounded-full px-2 py-0.5 text-xs text-white font-medium'>
                  {leverage}
                </span>
              </TableCell>
              <TableCell className='text-neutral-300'>{size}</TableCell>
              <TableCell className='text-neutral-300'>{entryPrice}</TableCell>
              <TableCell className='text-neutral-300'>{entryPrice}</TableCell>
              <TableCell className='text-neutral-300'>{liquidationPrice}</TableCell>
              <TableCell className='text-neutral-300'>{chargedFee}</TableCell>
              <TableCell
                className={pnl > 0 ? 'text-success-500' : 'text-error-500'}>
                {pnl > 0 ? `+${pnl}` : (
                  <div className="flex items-center">
                    <span className='mr-1.5'>{pnl}</span>
                    <Icon name='fire' />
                  </div>
                )}
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};

export default ClosedPosition;
