import Image from 'next/image';

const BalanceList = () => {
  return (
    <ul className="bg-neutral-600 rounded-lg">
      <li className="px-4 h-10 flex-between border-b border-neutral-700 last:border-b-0">
        <div className="flex gap-2">
          <Image src="/images/DAI.svg" width={24} height={24} alt="" />
          <div className="text-neutral-200 text-base font-medium">ETH</div>
        </div>
        <div className="text-neutral-50 text-base font-medium">0.12</div>
      </li>
      <li className="px-4 h-10 flex-between">
        <div className="flex gap-2">
          <Image src="/images/DAI.svg" width={24} height={24} alt="" />
          <div className="text-neutral-200 text-base font-medium">ETH</div>
        </div>
        <div className="text-neutral-50 text-base font-medium">0.12</div>
      </li>
    </ul>
  );
};

export default BalanceList;
