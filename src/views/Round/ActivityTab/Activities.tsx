import Link from 'next/link';
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

import EmptyDataMessage from './EmptyDataMessage';

interface Activity {
  date: string;
  amount: number;
  odds: number;
  total: number;
  result: 'won' | 'lost';
  status: 'verifying' | 'verified' | 'claim';
}

// fake data
// const activities: Activity[] = [
//   { date: '2 min ago', amount: 75, odds: 3.6, total: 230, result: 'won', status: 'verifying' },
//   { date: '2 min ago', amount: 75, odds: 3.6, total: 230, result: 'lost', status: 'verified' },
//   { date: '2 min ago', amount: 75, odds: 3.6, total: 230, result: 'won', status: 'claim' },
//   { date: '2 min ago', amount: 75, odds: 3.6, total: 230, result: 'won', status: 'verified' },
//   { date: '2 min ago', amount: 75, odds: 3.6, total: 230, result: 'lost', status: 'verified' },
//   { date: '2 min ago', amount: 75, odds: 3.6, total: 230, result: 'won', status: 'verified' },
// ];

const activities: Activity[] = [];

const columnHelper = createColumnHelper<Activity>();

const columns = [
  columnHelper.accessor('date', {}),
  columnHelper.accessor('amount', {
    cell: (info) => `$${info.getValue()}`,
  }),
  columnHelper.accessor('odds', {
    cell: (info) => `x${info.renderValue()}`,
  }),
  columnHelper.accessor('total', {
    cell: (info) => `$${info.getValue()}`,
  }),
  columnHelper.accessor('result', {
    cell: (info) => (
      <Status className="capitalize" variant={info.getValue() === 'won' ? 'success' : 'error'}>
        {info.getValue()}
      </Status>
    ),
  }),
  columnHelper.accessor('status', {
    cell: (info) => {
      const value = info.getValue();

      const generateValue = () => {
        if (value === 'verifying') return `${value}...`;
        if (value === 'claim')
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
  const table = useReactTable({
    data: activities,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
