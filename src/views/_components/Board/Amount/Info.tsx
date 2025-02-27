import clsx from 'clsx';

import toFixedNumber from '@/helpers/toFixedNumber';

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
      <li className="font-medium flex-between">
        <span className={labelClassName}>Total odds</span>
        <span className={valueClassName}>x{toFixedNumber(odd)}</span>
      </li>
      <li className="font-medium flex-between">
        <span className={labelClassName}>Possible payout</span>
        <span className={valueClassName}>${payout}</span>
      </li>
    </ul>
  );
};

export default AmountInfo;
