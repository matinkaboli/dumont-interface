import Image from 'next/image';

interface Props {
  address?: string;
  balance?: string;
}

const ConnectedWallet = ({ address, balance }: Props) => {
  return (
    <div className="border-primary-gradiant rounded-lg">
      <div className="flex-center-v gap-2 pl-1 pr-3 h-10 bg-primary-800 rounded-lg">
        <div className="flex-center-v gap-1 text-white text-sm bg-neutral-800 px-1 h-8 rounded-md">
          <Image width={20} height={20} src="/images/DAI.svg" alt="" />
          <span className="font-bold">{balance}</span>
          <span>DAI</span>
        </div>
        <div className="text-primary-250 text-sm">{address}</div>
      </div>
    </div>
  );
};

export default ConnectedWallet;
