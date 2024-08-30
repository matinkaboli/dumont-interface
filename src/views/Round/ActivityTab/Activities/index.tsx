import dayjs from 'dayjs';
import { useMemo } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
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

import getStatusDetails from '../helpers/getStatusDetails';
import isClaimable from '../helpers/isClaimable';

import EmptyDataMessage from '../EmptyDataMessage';

import ClaimButton from './ClaimButton';
import InfoTooltip from '@/views/_components/InfoTooltip';
import toFixedNumber from '@/helpers/toFixedNumber';
import VerifiedButton from './VerifiedButton';

interface Activity {
  index: number;
  status: 'FREE_REVEAL_REQUESTED' | 'GUESSED' | 'REVEALED' | 'CLAIMED';
  requestedAt: string;
  revealDate: string;
  betAmount: string;
  totalAmount: string;
  revelationHash?: string;
  result?: {
    isPlayerWinner: boolean;
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
  columnHelper.accessor('betAmount', {
    id: 'betAmount',
    header: 'bet amount',
    cell: ({ getValue }) => {
      const amount: string = getValue();

      if (!amount || amount === '0') {
        return '-';
      }

      const amountToFixed = toFixedNumber(parseUnits(amount, 6));

      return `$${amountToFixed}`;
    },
  }),
  columnHelper.accessor('result', {
    id: 'odds',
    header: 'odds',
    cell: ({ getValue }) => {
      const rate = getValue()?.rate;

      if (!rate) {
        return '-';
      }

      const rateToFixed = toFixedNumber(rate);

      return `x${rateToFixed}`;
    },
  }),
  columnHelper.accessor('totalAmount', {
    id: 'total',
    header: 'total',
    cell: ({ getValue }) => {
      const amount: string = getValue();

      if (!amount || amount === '0') {
        return '-';
      }

      const amountToFixed = toFixedNumber(parseUnits(amount, 6));

      return `$${amountToFixed}`;
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

      if (value === 'REVEALED') return <VerifiedButton revelationHash={activity.revelationHash} />;

      if (value === 'FREE_REVEAL_REQUESTED' || value === 'GUESSED') return `Verifying...`;

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
  } = useAxiosGet<Activity[]>(`games/${game?.id}/activities`, { interval: 10000 });

  const reversedActivities = useMemo(() => {
    return activities ? [...activities].reverse() : [];
  }, [activities]);

  const table = useReactTable({
    data: reversedActivities,
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
              <TableHead key={header.id}>
                {header.column.id === 'total' ? (
                  <InfoTooltip
                    label={flexRender(header.column.columnDef.header, header.getContext())}
                    tooltipText="We deducted a 10% fee from your winnings."
                    className="uppercase text-neutral-400 inline"
                  />
                ) : (
                  <span className="uppercase text-neutral-400 inline">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </span>
                )}
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
