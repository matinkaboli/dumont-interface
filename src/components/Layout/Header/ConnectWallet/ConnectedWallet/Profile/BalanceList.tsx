import { useEffect, useState } from 'react';
import axios from 'axios';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import InfoTooltip from '@/views/_components/InfoTooltip';
import makeApiUrl from '@/helpers/makeApiUrl';

const BalanceList = () => {
  const [settling, setSettling] = useState<number>(0);
  const {
    balance,
    profile: { address },
  } = useTypedSelector((state) => state.account);

  const fetchSettling = async () => {
    const fetchUrl = makeApiUrl(`players/${address}`);
    try {
      const response = await axios.get(fetchUrl);
      const jsonData = response.data;
      setSettling(jsonData?.result?.settling ?? 0);
    } catch (error) {
      setSettling(0);
    }
  };

  useEffect(() => {
    fetchSettling();
  }, []);

  return (
    <ul className="bg-neutral-600 rounded-lg">
      <li className="px-4 h-10 flex-between border-b border-neutral-700 last:border-b-0">
        <div className="text-neutral-200 text-base font-medium">Wallet</div>
        <div className="text-neutral-50 text-base font-medium">{balance} USDT</div>
      </li>
      <li className="px-4 h-10 flex-between">
        <InfoTooltip
          label="Settling"
          tooltipText="Some Info"
          className="text-neutral-200 text-base font-medium"
        />
        <div className="text-neutral-50 text-base font-medium">{settling} USDT</div>
      </li>
    </ul>
  );
};

export default BalanceList;
