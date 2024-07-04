import { useMemo } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import BN from 'bignumber.js';
import {
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Icon,
  Status,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';
import makeApiUrl from '@/helpers/makeApiUrl';
import useAxiosGet from '@/hooks/useAxiosGet';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import isEmpty from '@/helpers/isEmpty';

import EmptyDataMessage from './EmptyDataMessage';

interface Activity {
  index: number;
  status: 'FREE_REVEAL_REQUESTED' | 'GUESSED' | 'REVEALED' | 'CLAIMED';
  requestedAt: string;
  revealDate: string;
  result?: {
    isPlayerWinner: boolean;
    betAmount: string;
    montAmount: string;
    rate: string;
  };
}

type ExtendedCellContext<TData, TValue> = CellContext<TData, TValue> & {
  claimableAfter?: string;
};

dayjs.extend(relativeTime);

const columnHelper = createColumnHelper<Activity>();

const columns = [
  columnHelper.accessor('requestedAt', {
    header: 'date',
    cell: ({ getValue }) => {
      const timestamp = getValue();
      const date = dayjs.unix(parseInt(timestamp, 10)); // Convert seconds to milliseconds
      return date.fromNow();
    },
  }),
  columnHelper.accessor('result', {
    header: 'bet amount',
    cell: ({ getValue }) => {
      const amount = getValue()?.betAmount;
      return amount ? `$${amount}` : '-';
    },
  }),
  columnHelper.accessor('result', {
    header: 'odd',
    cell: ({ getValue }) => {
      const rate = getValue()?.rate;
      return rate ? `x${rate}` : '-';
    },
  }),
  columnHelper.accessor('result', {
    header: 'total',
    cell: ({ getValue }) => {
      const result = getValue();
      if (!isEmpty(result)) {
        const total = new BN(result!.rate).times(result!.betAmount);
        return `$${total}`;
      }
      return '-';
    },
  }),
  columnHelper.accessor('result', {
    header: 'result',
    cell: ({ getValue }) => {
      const isPlayerWinner = getValue()?.isPlayerWinner;

      return (
        <Status
          className="capitalize"
          variant={isPlayerWinner === undefined ? 'default' : isPlayerWinner ? 'success' : 'error'}
        >
          {isPlayerWinner === undefined ? 'Revealed' : isPlayerWinner ? 'Won' : 'Lost'}
        </Status>
      );
    },
  }),
  columnHelper.accessor('status', {
    header: 'proof',
    cell: ({ row, claimableAfter }: ExtendedCellContext<Activity, Activity['status']>) => {
      const activity = row.original;
      const value = activity.status;

      const requestedAt = parseInt(activity.requestedAt, 10); // Convert to number
      const claimableAt = parseInt(claimableAfter ?? '0', 10);
      const claimableTime = dayjs.unix(requestedAt + claimableAt);
      const currentTime = dayjs();

      if (currentTime.isAfter(claimableTime) && value === 'GUESSED') {
        return (
          <Link href="/" className="flex items-center gap-0.5 text-primary-250">
            {value}
            <Icon name="angle-right" width="16" height="16" color="#EA00FF" />
          </Link>
        );
      }
      if (value === 'FREE_REVEAL_REQUESTED' || value === 'GUESSED') return `Verifying...`;
      if (value === 'REVEALED') return 'Verified';
      if (value === 'CLAIMED') return 'Claimed';
    },
  }),
];

const Activities = () => {
  const { data: game } = useTypedSelector((state) => state.game);
  const { data: activities, loading } = useAxiosGet<Activity[]>(
    useMemo(() => makeApiUrl(`games/${game?.id}/activities`), [game?.id]),
  );

  const table = useReactTable({
    data: activities || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log('here', activities);

  if (loading) return <div className="text-white">Loading...</div>;

  if (isEmpty(activities)) return <EmptyDataMessage message="No activity yet" />;

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className="uppercase text-neutral-400">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="text-neutral-200">
                {flexRender(cell.column.columnDef.cell, {
                  ...cell.getContext(),
                  claimableAfter: game?.claimableAfter,
                })}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Activities;
