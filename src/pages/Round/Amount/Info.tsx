import clsx from 'clsx';

interface Props {
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
  odd: number;
  total: number;
}

const AmountInfo = ({
  className = '',
  labelClassName = '',
  valueClassName = '',
  odd,
  total,
}: Props) => {
  return (
    <ul className={clsx('flex flex-col', className)}>
      <li className="text-sm font-medium flex-between">
        <span className={labelClassName}>odd</span>
        <span className={valueClassName}>x{odd}</span>
      </li>
      <li className="text-sm font-medium flex-between">
        <span className={labelClassName}>Total</span>
        <span className={valueClassName}>${total}</span>
      </li>
    </ul>
  );
};

export default AmountInfo;
