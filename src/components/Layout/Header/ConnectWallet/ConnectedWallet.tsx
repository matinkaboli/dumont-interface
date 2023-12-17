import Image from 'next/image';

const ConnectedWallet = () => {
  return (
    <div className="flex items-center gap-2 pl-1 pr-3 h-10 rounded-lg bg-primary-600">
      <div className="flex items-center gap-1 text-white text-sm bg-primary-700 px-2 py-1.5 rounded-md">
        <Image width={20} height={20} src="/images/DAI.svg" alt="" />
        <span className="font-bold">100,34</span>
        <span>DAI</span>
      </div>
      <div className="text-white text-sm">0x9a51...4cFc</div>
    </div>
  );
};

export default ConnectedWallet;
