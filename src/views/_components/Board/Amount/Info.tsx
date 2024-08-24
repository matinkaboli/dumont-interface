import clsx from 'clsx';

interface Props {
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
  odd: number;
  payout: number;
}

const AmountInfo = ({
  className = '',
  labelClassName = '',
  valueClassName = '',
  odd,
  payout,
}: Props) => {
  return (
    <ul className={clsx('flex flex-col', className)}>
      <li className="text-sm font-medium flex-between">
        <span className={labelClassName}>Total odds</span>
        <span className={valueClassName}>x{odd}</span>
      </li>
      <li className="text-sm font-medium flex-between">
        <span className={labelClassName}>Possible payout</span>
        <span className={valueClassName}>${payout}</span>
      </li>
    </ul>
  );
};

export default AmountInfo;
