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
  Loading,
  Status,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';
import useAxiosGet from '@/hooks/useAxiosGet';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import isEmpty from '@/helpers/isEmpty';
import parseUnits from '@/helpers/parseUnits';
import humanizeAmount from '@/helpers/humanizeAmount';

import getStatusDetails from '../helpers/getStatusDetails';
import isClaimable from '../helpers/isClaimable';

import EmptyDataMessage from '../EmptyDataMessage';

import ClaimButton from './ClaimButton';

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
  gameAddress?: `0x${string}`;
  fetchActivities?: () => Promise<void>;
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
    id: 'betAmount',
    header: 'bet amount',
    cell: ({ getValue }) => {
      const amount = getValue()?.betAmount;
      return amount ? `$${humanizeAmount(parseUnits(amount, 6).toString())}` : '-';
    },
  }),
  columnHelper.accessor('result', {
    id: 'odds',
    header: 'odds',
    cell: ({ getValue }) => {
      const rate = getValue()?.rate;
      return rate ? `x${rate}` : '-';
    },
  }),
  columnHelper.accessor('result', {
    id: 'total',
    header: 'total',
    cell: ({ getValue }) => {
      const result = getValue();
      if (!isEmpty(result)) {
        const total = new BN(result!.rate).times(result!.betAmount);
        return `$${humanizeAmount(parseUnits(total, 6).toString())}`;
      }
      return '-';
    },
  }),
  columnHelper.accessor('result', {
    header: 'result',
    cell: ({ getValue }) => {
      const { variant, text } = getStatusDetails(getValue()?.isPlayerWinner);

      return (
        <Status className="capitalize" variant={variant as any}>
          {text}
        </Status>
      );
    },
  }),
  columnHelper.accessor('status', {
    header: 'proof',
    cell: ({
      row,
      claimableAfter,
      gameAddress,
      fetchActivities,
    }: ExtendedCellContext<Activity, Activity['status']>) => {
      const activity = row.original;
      const value = activity.status;

      if (isClaimable(activity.requestedAt, claimableAfter) && value === 'GUESSED') {
        return (
          <ClaimButton
            refetch={fetchActivities}
            cardIndex={activity.index}
            gameAddress={gameAddress}
          />
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
  const {
    data: activities,
    loading,
    refetch,
  } = useAxiosGet<Activity[]>(`games/${game?.id}/activities`, { interval: 30000 });

  const table = useReactTable({
    data: activities || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading)
    return (
      <div className="flex-center mt-14 mb-10">
        <Loading size={32} />
      </div>
    );

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
                  gameAddress: game?.address,
                  fetchActivities: refetch,
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
