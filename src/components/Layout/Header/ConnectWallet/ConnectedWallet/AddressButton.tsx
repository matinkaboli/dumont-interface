import Image from 'next/image';

import truncateString from '@/helpers/truncateString';
import { useTypedSelector } from '@/hooks/useTypedSelector';

interface Props {
  onOpenChange: () => void;
}

const AddressButton = ({ onOpenChange }: Props) => {
  const { address } = useTypedSelector((state) => state.account.profile);
  const balance = useTypedSelector((state) => state.account.balance);

  return (
    <div className="border-primary-gradiant rounded-lg">
      <button
        type="button"
        className="flex-center-v gap-2 pl-1 pr-3 h-10 bg-primary-800 rounded-lg"
        onClick={onOpenChange}
      >
        <div className="flex-center-v gap-1 text-white text-sm bg-neutral-800 px-1 h-8 rounded-md">
          <Image width={20} height={20} src="/images/USDT.svg" alt="" />
          <span className="font-bold">{balance}</span>
          <span>USDT</span>
        </div>
        <div className="text-primary-250 text-sm">{truncateString(address || '')}</div>
      </button>
    </div>
  );
};

export default AddressButton;
