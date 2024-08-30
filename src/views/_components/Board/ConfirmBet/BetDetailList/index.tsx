import clsx from 'clsx';

import ListItem from './ListItem';

export interface BetInfo {
  label: string;
  value: string;
  tooltip?: string;
}

interface Props {
  items: BetInfo[];
  className?: string;
}

const BetDetailList = ({ items, className }: Props) => {
  return (
    <ul className={clsx('flex flex-col gap-6', className)}>
      {items.map((item, index) => (
        <ListItem key={index} label={item.label} value={item.value} tooltip={item.tooltip} />
      ))}
    </ul>
  );
};

export default BetDetailList;
