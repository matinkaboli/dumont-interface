import Image from 'next/image';
import { useBalance } from 'wagmi';
import { Contracts } from '@/constants/contracts';

interface Props {
  address?: string;
}

const BalanceList = ({ address }: Props) => {
  const { data: USDTBalance } = useBalance({
    address: address as `0x${string}`,
    token: Contracts.STABLE_COIN,
  });

  const { data: DAIBalance } = useBalance({
    address: address as `0x${string}`,
    token: Contracts.DAI,
  });

  return (
    <ul className="bg-neutral-600 rounded-lg">
      <li className="px-4 h-10 flex-between border-b border-neutral-700 last:border-b-0">
        <div className="flex gap-2">
          <Image src="/images/USDT.svg" width={24} height={24} alt="" />
          <div className="text-neutral-200 text-base font-medium">USDT</div>
        </div>
        <div className="text-neutral-50 text-base font-medium">{USDTBalance?.formatted}</div>
      </li>
      <li className="px-4 h-10 flex-between">
        <div className="flex gap-2">
          <Image src="/images/DAI.svg" width={24} height={24} alt="" />
          <div className="text-neutral-200 text-base font-medium">DAI</div>
        </div>
        <div className="text-neutral-50 text-base font-medium">{DAIBalance?.formatted}</div>
      </li>
    </ul>
  );
};

export default BalanceList;
