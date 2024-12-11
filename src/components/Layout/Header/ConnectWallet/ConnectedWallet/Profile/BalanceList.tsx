import { useBalance } from 'wagmi';
import Image from 'next/image';
import ethers from 'ethers';

import humanizeAmount from '@/helpers/humanizeAmount';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const BalanceList = () => {
  const {
    balance,
    profile: { address },
  } = useTypedSelector((state) => state.account);
  const { details } = useTypedSelector((state) => state.config);

  const { data: montBalance } = useBalance({
    address,
    token: details?.mont,
  });


  const { data: ethBalance } = useBalance({
    address,
  });

  const tokens = [
    {
      icon: '/images/tokens/usdc.svg',
      symbol: 'USDC',
      value: balance ?? '0'
    },
    {
      icon: '/images/tokens/eth.svg',
      symbol: 'ETH',
      value: ethBalance?.formatted ?? '0'
    },
    {
      icon: '/images/tokens/mont.svg',
      symbol: 'MONT',
      value: montBalance?.formatted ?? '0'
    }
  ];

  return (
    <ul className="bg-neutral-600 rounded-lg">
      {tokens.map((token) => (
        <li
          key={token.symbol}
          className="px-4 h-10 flex-between border-b border-neutral-700 last:border-b-0"
        >
          <div className="text-white text-base font-medium flex items-center gap-2">
            <Image width={24} height={24} src={token.icon} alt='' />
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
