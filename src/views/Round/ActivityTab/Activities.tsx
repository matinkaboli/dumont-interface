import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
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

import EmptyDataMessage from './EmptyDataMessage';

interface Activity {
  cardIndex: number;
  status: 'verifying' | 'verified' | 'claimable';
  guessDate: string;
  revealDate: string;
  result: {
    isPlayerWinner: boolean;
    betAmount: string;
    montAmount: string;
    rate: string;
  };
}

dayjs.extend(relativeTime);

const columnHelper = createColumnHelper<Activity>();

const columns = [
  columnHelper.accessor('guessDate', {
    header: 'date',
    cell: (info) => dayjs(info.getValue()).fromNow()
  }),
  columnHelper.accessor('result.betAmount', {
    header: 'amount',
    cell: (info) => `$${info.getValue()}`,
  }),
  // columnHelper.accessor('odds', {
  //   cell: (info) => `x${info.renderValue()}`,
  // }),
  // columnHelper.accessor('total', {
  //   cell: (info) => `$${info.getValue()}`,
  // }),
  columnHelper.accessor('result.isPlayerWinner', {
    header: 'result',
    cell: (info) => (
      <Status className="capitalize" variant={info.getValue() ? 'success' : 'error'}>
        {info.getValue() ? 'won': 'lost'}
      </Status>
    ),
  }),
  columnHelper.accessor('status', {
    cell: (info) => {
      const value = info.getValue();

      const generateValue = () => {
        if (value === 'verifying') return `${value}...`;
        if (value === 'claimable')
          return (
            <Link href="/" className="flex items-center gap-0.5 text-primary-250">
              {value}
              <Icon name="angle-right" width="16" height="16" color="#EA00FF" />
            </Link>
          );
        return value;
      };

      return <div className="capitalize">{generateValue()}</div>;
    },
  }),
];

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const table = useReactTable({
    data: activities,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const fetchActivities = async (id: string) => {
    try {
      const url = makeApiUrl(`games/${id}/activities`);
      const response = await axios.get(url);
      setActivities(response.data?.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchActivities('32');
  }, []);

  return (
    <>
      {!activities?.length ? (
        <EmptyDataMessage message="No activity yet" />
      ) : (
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default Activities;
