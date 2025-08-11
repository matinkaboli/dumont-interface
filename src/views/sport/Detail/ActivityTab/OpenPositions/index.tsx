import Image from 'next/image';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components';
import isEmpty from '@/helpers/isEmpty';

import { FormattedPosition } from '@/views/sport/Detail/ActivityTab';
import EmptyDataMessage from '@/views/card/Game/ActivityTab/EmptyDataMessage';

import ClosePositionButton from './ClosePositionButton';

const OpenPositions = ({ positions }: { positions: FormattedPosition[] }) => {

  if (isEmpty(positions)) return <EmptyDataMessage message='No open position yet' />;

  return (
    <Table className='text-white'>
      <TableHeader>
        <TableRow className='uppercase text-neutral-400 text-xs font-medium'>
          <TableHead>Outcome</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Entry%</TableHead>
          <TableHead>Liquid%</TableHead>
          <TableHead>Fee</TableHead>
          <TableHead>PNL</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {positions?.map(({ id, name, logo, size, entry, multiplier, fee, pnl, liquid }) => (
          <TableRow key={id}>
            <TableCell className='flex items-center gap-2 pr-6'>
              <Image
                width={24}
                height={24}
                className='h-6 w-6 rounded-full'
                src={logo ?? '/images/draw.png'}
                alt={name ?? ''}
              />
              <span className='text-neutral-300 font-medium text-sm'>{name}</span>
              <span className='bg-neutral-750 rounded-full px-2 py-0.5 text-xs text-white font-medium'>
                {multiplier}
              </span>
            </TableCell>
            <TableCell className='text-neutral-300'>${size.toFixed(2)}</TableCell>
            <TableCell className='text-neutral-300'>{entry?.toFixed(2)}%</TableCell>
            <TableCell className='text-neutral-300'>${liquid.toFixed(2)}</TableCell>
            <TableCell className='text-neutral-300'>${fee.toFixed(2)}</TableCell>
            <TableCell className={pnl > 0 ? 'text-success-600' : 'text-error-500'}>
              {pnl > 0 ? `+$${pnl.toFixed(2)}` : `$${pnl.toFixed(2)}`}
            </TableCell>
            <TableCell>
              <ClosePositionButton
                id={id}
                name={name}
                size={size}
                fee={fee}
                pnl={pnl}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OpenPositions;
