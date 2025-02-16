import clsx from 'clsx';

interface Props {
  label: string;
  amount: number;
  percentage: number;
  type: 'win' | 'loss';
  formatAmount: (arg: number) => string;
}

const StatsBar = ({ label, amount, percentage, type, formatAmount }: Props) => {
  const isWin = type === 'win';

  return (
    <div className="max-w-[486px] w-full mt-6">
      <div className="text-white text-base">
        <b>
          {isWin ? '+' : '-'} ${formatAmount(amount)}
        </b>{' '}
        {label}
      </div>
      <div
        className={clsx(
          amount === 0 ? 'bg-neutral-500' : isWin ? 'bg-success-400' : 'bg-error-400',
          'h-2 mt-2 rounded',
        )}
        style={{ width: amount === 0 ? '4%' : `${percentage}%` }}
      ></div>
    </div>
  );
};

export default StatsBar;
