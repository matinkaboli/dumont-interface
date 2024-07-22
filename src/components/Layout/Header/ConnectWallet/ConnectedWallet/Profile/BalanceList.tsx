import { useTypedSelector } from '@/hooks/useTypedSelector';
import useAxiosGet from '@/hooks/useAxiosGet';
import makeApiUrl from '@/helpers/makeApiUrl';
import humanizeAmount from '@/helpers/humanizeAmount';

import InfoTooltip from '@/views/_components/InfoTooltip';

interface PlayerData {
  settling: number;
}

const BalanceList = () => {
  const {
    balance,
    profile: { address },
  } = useTypedSelector((state) => state.account);

  const { data } = useAxiosGet<PlayerData>(makeApiUrl(`players/${address}`), { interval: 5000 });

  return (
    <ul className="bg-neutral-600 rounded-lg">
      <li className="px-4 h-10 flex-between border-b border-neutral-700 last:border-b-0">
        <div className="text-neutral-200 text-base font-medium">Wallet</div>
        <div className="text-neutral-50 text-base font-medium">
          {balance ? humanizeAmount(balance) : 0} USDT
        </div>
      </li>
      <li className="px-4 h-10 flex-between">
        <InfoTooltip
          label="Settling"
          tooltipText="Some Info"
          className="text-neutral-200 text-base font-medium"
        />
        <div className="text-neutral-50 text-base font-medium">
          {data?.settling ? humanizeAmount(data?.settling) : 0} USDT
        </div>
      </li>
    </ul>
  );
};

export default BalanceList;
