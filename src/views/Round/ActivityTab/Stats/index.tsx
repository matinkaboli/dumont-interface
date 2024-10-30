import { useMemo } from 'react';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import toFixedNumber from '@/helpers/toFixedNumber';
import parseUnits from '@/helpers/parseUnits';

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
  console.log(winPercentage);

  return (
    <div className="bg-neutral-750 md:px-6 px-4 md:pt-6 pt-4 md:pb-10 pb-8 rounded-lg">
      <div className="border border-neutral-600 px-4 py-3 rounded-lg w-fit">
        <div>
          <span className="text-base text-white">PNL</span>
          <span className="text-neutral-300 text-xs pl-1">(Profit and Loss)</span>
        </div>
        <div className="font-bold text-2xl text-white mt-2">
          {isPnlPositive ? '+' : '-'}${toFixedNumber(parseUnits(Math.abs(pnl), 6))}
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <div className="max-w-[486px] w-full">
          <div className="text-white text-base">
            <b>+ ${toFixedNumber(parseUnits(stats.wins, 6))}</b> Win
          </div>
          <div
            className="bg-success-400 h-2 mt-2 rounded"
            style={{ width: `${winPercentage}%` }}
          ></div>
        </div>

        <div className="max-w-[486px] w-full mt-6">
          <div className="text-white text-base">
            <b>- ${toFixedNumber(parseUnits(stats.losses, 6))}</b> Lost
          </div>
          <div
            className="bg-error-400 h-2 mt-2 rounded"
            style={{ width: `${100 - winPercentage}%` }}
          ></div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Stats;
