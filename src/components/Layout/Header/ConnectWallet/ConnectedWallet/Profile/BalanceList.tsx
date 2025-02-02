import Image from 'next/image';

import humanizeAmount from '@/helpers/humanizeAmount';

import { Balance } from './.';

const BalanceList = ({ accountBalance }: { accountBalance: Balance }) => {
  const tokens = [
    {
      icon: '/images/tokens/usdc.svg',
      symbol: 'USDC',
      value: accountBalance.usdc ?? '0',
    },
    {
      icon: '/images/tokens/mont.svg',
      symbol: 'MONT',
      value: accountBalance.mont ?? '0',
    },
  ];

  return (
    <ul className="bg-neutral-700 rounded-lg">
      {tokens.map((token) => (
        <li
          key={token.symbol}
          className="px-4 h-12 flex-between border-b border-neutral-750 last:border-b-0"
        >
          <div className="text-white text-base font-medium flex items-center gap-2">
            <Image width={24} height={24} src={token.icon} alt="" />
            {token.symbol}
          </div>
          <div className="text-neutral-200 text-base font-medium">
            {humanizeAmount(token.value)}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BalanceList;
