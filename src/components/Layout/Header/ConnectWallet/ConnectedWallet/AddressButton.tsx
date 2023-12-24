import React from 'react';
import Image from 'next/image';

interface Props {
  balance?: string;
  truncatedAddress?: string;
  onOpenChange: () => void;
}

const AddressButton = ({ balance, truncatedAddress, onOpenChange }: Props) => {
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
        <div className="text-primary-250 text-sm">{truncatedAddress}</div>
      </button>
    </div>
  );
};

export default AddressButton;
