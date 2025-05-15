import { HTMLAttributes, Ref } from 'react';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  ref?: Ref<HTMLTableElement>;
}

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  ref?: Ref<HTMLTableSectionElement>;
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  ref?: Ref<HTMLTableSectionElement>;
}

export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {
  ref?: Ref<HTMLTableSectionElement>;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  ref?: Ref<HTMLTableRowElement>;
}

export interface TableHeadProps extends HTMLAttributes<HTMLTableCellElement> {
  ref?: Ref<HTMLTableCellElement>;
}

export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {
  ref?: Ref<HTMLTableCaptionElement>;
}

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  ref?: Ref<HTMLTableCellElement>;
}
