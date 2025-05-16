import clsx from 'clsx';
import {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeaderProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
} from './table.types';

const Table =
  ({ ref, className, ...props }: TableProps) => (
    <div className='relative w-full overflow-auto bg-neutral-800 rounded-lg border-[1.5px] border-neutral-700'>
      <table ref={ref} className={clsx('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  );
Table.displayName = 'Table';

const TableHeader = ({ ref, className, ...props }: TableHeaderProps) => (
  <thead ref={ref} className={clsx('[&_tr]:!border-b-0 bg-neutral-780', className)} {...props} />
);
TableHeader.displayName = 'TableHeader';

const TableBody = ({ ref, className, ...props }: TableBodyProps) => (
  <tbody ref={ref} className={clsx('[&_tr:last-child]:border-0', className)} {...props} />
);
TableBody.displayName = 'TableBody';

const TableFooter = ({ ref, className, ...props }: TableFooterProps) => (
  <tfoot
    ref={ref}
    className={clsx('border-t-[1.5px] border-neutral-700 font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
);
TableFooter.displayName = 'TableFooter';

const TableRow = (
  { ref, className, ...props }: TableRowProps) => (
  <tr ref={ref} className={clsx('border-b-[1.5px] border-neutral-700', className)} {...props} />
);
TableRow.displayName = 'TableRow';

const TableHead = ({ ref, className, ...props }: TableHeadProps) => (
  <th
    ref={ref}
    className={clsx(
      'first:md:pl-6 first:pl-1 sm:pr-0 pr-3 text-xs whitespace-nowrap font-medium h-11 text-left align-middle [&:has([role=checkbox])]:pr-0',
      className,
    )}
    {...props}
  />
);
TableHead.displayName = 'TableHead';

const TableCell = ({ ref, className, ...props }: TableCellProps) => (
  <td
    ref={ref}
    className={clsx(
      'first:md:pl-6 first:pl-1 sm:pr-0 pr-3 text-sm whitespace-nowrap font-medium md:h-14 h-12 align-middle [&:has([role=checkbox])]:pr-0',
      className,
    )}
    {...props}
  />
);
TableCell.displayName = 'TableCell';

const TableCaption = ({ ref, className, ...props }: TableCaptionProps) => (
  <caption ref={ref} className={clsx('my-4 text-sm', className)} {...props} />
);
TableCaption.displayName = 'TableCaption';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
