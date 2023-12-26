import Image from 'next/image';
import { useBalance } from 'wagmi';

import { Contracts } from '@/constants/contracts';
import { useTypedSelector } from '@/hooks/useTypesSelector';

interface Props {
  address?: string;
}

const BalanceList = ({ address }: Props) => {
  const USDTBalance = useTypedSelector((state) => state.account.balance);

  const { data: ETHBalance } = useBalance({
    address: address as `0x${string}`,
    token: Contracts.ETH,
    watch: true,
  });

  return (
    <ul className="bg-neutral-600 rounded-lg">
      <li className="px-4 h-10 flex-between border-b border-neutral-700 last:border-b-0">
        <div className="flex gap-2">
          <Image src="/images/USDT.svg" width={24} height={24} alt="" />
          <div className="text-neutral-200 text-base font-medium">USDT</div>
        </div>
        <div className="text-neutral-50 text-base font-medium">{USDTBalance}</div>
      </li>
      <li className="px-4 h-10 flex-between">
        <div className="flex gap-2">
          <Image src="/images/ethereum.svg" width={24} height={24} alt="" />
          <div className="text-neutral-200 text-base font-medium">ETH</div>
        </div>
        <div className="text-neutral-50 text-base font-medium">{ETHBalance?.formatted}</div>
      </li>
    </ul>
  );
};

export default BalanceList;
