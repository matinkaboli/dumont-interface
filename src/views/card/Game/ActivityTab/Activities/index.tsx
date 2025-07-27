import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
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
import { AppDispatch } from '@/redux/store';
import { getActivities } from '@/redux/features/faro/activitySlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import isEmpty from '@/helpers/isEmpty';
import parseUnits from '@/helpers/parseUnits';
import toFixedNumber from '@/helpers/toFixedNumber';
import {Activity} from '@/types/faro';

import InfoTooltip from '@/views/_components/InfoTooltip';

import getStatusDetails from '../helpers/getStatusDetails';
import isClaimable from '../helpers/isClaimable';

import EmptyDataMessage from '../EmptyDataMessage';

import ClaimButton from './ClaimButton';
import VerifiedButton from './VerifiedButton';

type ExtendedCellContext<TData, TValue> = CellContext<TData, TValue> & {
  claimableAfter?: string;
  gameId?: number;
  fetchActivities?: () => Promise<void>;
};

dayjs.extend(relativeTime);

const columnHelper = createColumnHelper<Activity>();

const columns = [
  columnHelper.accessor('requestedAt', {
    header: 'date',
    cell: ({ getValue }) => {
      const timestamp = getValue();
      const date = dayjs.unix(timestamp); // Convert seconds to milliseconds
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
      gameId,
      fetchActivities,
    }: ExtendedCellContext<Activity, Activity['status']>) => {
      const activity = row.original;
      const value = activity.status;

      if (isClaimable(activity.requestedAt, claimableAfter) && value === 'GUESSED') {
        return (
          <ClaimButton
            refetch={fetchActivities}
            cardIndex={activity.index}
            gameId={gameId}
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
  const dispatch = useDispatch<AppDispatch>();
  const { data: game } = useTypedSelector((state) => state.faro.main);
  const { activities, loading, isRefetching } = useTypedSelector((state) => state.faro.activity);
  const handleFetchActivities = () => {
    if (game?.id) dispatch(getActivities(game.id));
  };

  useEffect(() => {
    const intervalId = setInterval(handleFetchActivities, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    handleFetchActivities();
  }, [game]);

  const reversedActivities = useMemo(() => {
    if (!activities) return [];

    return [...activities].sort((a, b) => b.requestedAt - a.requestedAt);
  }, [activities]);

  const table = useReactTable({
    data: reversedActivities,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading && !isRefetching)
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
              <TableCell key={cell.id} className="text-neutral-300">
                {flexRender(cell.column.columnDef.cell, {
                  ...cell.getContext(),
                  claimableAfter: game?.claimableAfter,
                  gameId: game?.id,
                  fetchActivities: handleFetchActivities,
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
