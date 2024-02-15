import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Status,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';

interface Activity {
  date: string;
  amount: number;
  odds: number;
  total: number;
  status: 'won' | 'lost';
}

const activities: Activity[] = [
  { date: '2 min ago', amount: 75, odds: 3.6, total: 230, status: 'won' },
  { date: '2 min ago', amount: 75, odds: 3.6, total: 230, status: 'lost' },
  { date: '2 min ago', amount: 75, odds: 3.6, total: 230, status: 'won' },
  { date: '2 min ago', amount: 75, odds: 3.6, total: 230, status: 'won' },
  { date: '2 min ago', amount: 75, odds: 3.6, total: 230, status: 'lost' },
  { date: '2 min ago', amount: 75, odds: 3.6, total: 230, status: 'won' },
];

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
  columnHelper.accessor('status', {
    cell: (info) => (
      <Status className="capitalize" variant={info.getValue() === 'won' ? 'success' : 'error'}>
        {info.getValue()}
      </Status>
    ),
  }),
];

const Activities = () => {
  const table = useReactTable({
    data: activities,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Activities;
