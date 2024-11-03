import { useMemo } from 'react';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import toFixedNumber from '@/helpers/toFixedNumber';
import parseUnits from '@/helpers/parseUnits';
import isEmpty from '@/helpers/isEmpty';
import { Loading } from '@/components';

import StatsBar from './StatsBar';
import EmptyDataMessage from '../EmptyDataMessage';


const Stats = () => {
  const { activities, loading } = useTypedSelector((state) => state.activity);

  const stats = useMemo(() => {
    if (!activities?.length) {
      return { wins: 0, losses: 0, pnl: 0 };
    }

    return activities.reduce(
      (acc, activity) => {
        const amount = activity.totalAmount || 0;

        if (activity?.result?.isPlayerWinner) {
          acc.wins += +amount;
        } else {
          acc.losses += +amount;
        }

        return acc;
      },
      { wins: 0, losses: 0 },
    );
  }, [activities]);

  const pnl = stats.wins - stats.losses;
  const isPnlPositive = pnl > 0;

  const winPercentage = (stats.wins / (stats.wins + stats.losses)) * 100;

  const formatAmount = (amount: number) => toFixedNumber(parseUnits(Math.abs(amount), 6));

  if (loading) {
    return (
      <div className="flex-center mt-14 mb-10">
        <Loading size={32} />
      </div>
    );
  }

  if (isEmpty(activities)) {
    return <EmptyDataMessage message="There is no stats" />;
  }

  return (
    <div className="bg-neutral-750 md:px-6 px-4 md:pt-6 pt-4 md:pb-10 pb-8 rounded-lg">
      <div className="border border-neutral-600 px-4 py-3 rounded-lg w-fit">
        <div>
          <span className="text-base text-white">PNL</span>
          <span className="text-neutral-300 text-xs pl-1">(Profit and Loss)</span>
        </div>
        <div className="font-bold text-2xl text-white mt-2">
          {isPnlPositive ? '+' : '-'}${formatAmount(pnl)}
        </div>
      </div>

      <div className="flex flex-col">
        <StatsBar
          label="Win"
          amount={stats.wins}
          percentage={winPercentage}
          type="win"
          formatAmount={formatAmount}
        />
        <StatsBar
          label="Lost"
          amount={stats.losses}
          percentage={100 - winPercentage}
          type="loss"
          formatAmount={formatAmount}
        />
      </div>
    </div>
  );
};

export default Stats;
