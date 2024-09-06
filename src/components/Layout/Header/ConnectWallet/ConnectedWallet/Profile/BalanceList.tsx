import useAxiosGet from '@/hooks/useAxiosGet';
import parseUnits from '@/helpers/parseUnits';
import humanizeAmount from '@/helpers/humanizeAmount';
import InfoTooltip from '@/views/_components/InfoTooltip';
import { useTypedSelector } from '@/hooks/useTypedSelector';

interface PlayerData {
  settling: number;
}

const BalanceList = () => {
  const {
    balance,
    profile: { address },
  } = useTypedSelector((state) => state.account);

  const { data } = useAxiosGet<PlayerData>(`players/${address}`, { interval: 2000 });

  let settling = '0';

  if (data?.settling) {
    settling = humanizeAmount(parseUnits(data.settling, 6).toString());
  }

  return (
    <ul className="bg-neutral-600 rounded-lg">
      <li className="px-4 h-10 flex-between border-b border-neutral-700 last:border-b-0">
        <div className="text-neutral-200 text-base font-medium">Wallet</div>
        <div className="text-neutral-50 text-base font-medium">
          {balance ? humanizeAmount(balance) : 0} USDC
        </div>
      </li>
      <li className="px-4 h-10 flex-between">
        <InfoTooltip
          label="Settling"
          tooltipText="Pending winnings will be added to your balance after verification, usually within 15 seconds."
          className="text-neutral-200 text-base font-medium"
        />
        <div className="text-neutral-50 text-base font-medium">{settling} USDC</div>
      </li>
    </ul>
  );
};

export default BalanceList;
