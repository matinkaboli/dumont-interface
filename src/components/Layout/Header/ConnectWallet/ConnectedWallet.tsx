import Image from 'next/image';

const ConnectedWallet = () => {
  return (
    <div className="border-primary-gradiant rounded-lg">
      <div className="flex-center-v gap-2 pl-1 pr-3 h-10 bg-primary-800 rounded-lg">
        <div className="flex-center-v gap-1 text-white text-sm bg-neutral-800 px-1 h-8 rounded-md">
          <Image width={20} height={20} src="/images/DAI.svg" alt="" />
          <span className="font-bold">100,34</span>
          <span>DAI</span>
        </div>
        <div className="text-primary-250 text-sm">0x9a51...4cFc</div>
      </div>
    </div>
  );
};

export default ConnectedWallet;
