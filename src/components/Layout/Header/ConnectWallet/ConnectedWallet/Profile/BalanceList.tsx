import { useTypedSelector } from '@/hooks/useTypedSelector';

import InfoTooltip from '@/views/_components/InfoTooltip';

const BalanceList = () => {
  const USDTBalance = useTypedSelector((state) => state.account.balance);

  return (
    <ul className="bg-neutral-600 rounded-lg">
      <li className="px-4 h-10 flex-between border-b border-neutral-700 last:border-b-0">
        <div className="text-neutral-200 text-base font-medium">Wallet</div>
        <div className="text-neutral-50 text-base font-medium">{USDTBalance} USDT</div>
      </li>
      <li className="px-4 h-10 flex-between">
        <InfoTooltip
          label="Settling"
          tooltipText="Some Info"
          className="text-neutral-200 text-base font-medium"
        />
        <div className="text-neutral-50 text-base font-medium">50 USDT</div>
      </li>
    </ul>
  );
};

export default BalanceList;
