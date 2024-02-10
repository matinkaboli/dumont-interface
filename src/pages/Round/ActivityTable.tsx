import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';

import React from 'react';

const ActivityTable = () => {
  return (
    <Table>
      <TableHeader className="text-neutral-400">
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium text-neutral-200">INV001</TableCell>
          <TableCell className="text-neutral-200">Paid</TableCell>
          <TableCell className="text-neutral-200">Credit Card</TableCell>
          <TableCell className=" text-neutral-200">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-neutral-200">INV001</TableCell>
          <TableCell className="text-neutral-200">Paid</TableCell>
          <TableCell className="text-neutral-200">Credit Card</TableCell>
          <TableCell className=" text-neutral-200">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ActivityTable;
