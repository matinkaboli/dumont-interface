'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button, Dialog, DialogDescription } from '@/components';

interface Props {
  address?: string;
  balance?: string;
}

const ConnectedWallet = ({ address, balance }: Props) => {
  const [open, setOpen] = useState(false);
  const onOpenChange = () => setOpen((prev) => !prev);

  return (
    <>
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
          <div className="text-primary-250 text-sm">{address}</div>
        </button>
      </div>

      <Dialog open={open} onOpenChange={onOpenChange} showCloseButton>
        <DialogDescription>
          Make changes to your profile here. Click save when yore done.
        </DialogDescription>

        <Button className="mt-2" onClick={onOpenChange}>
          Save changes
        </Button>
      </Dialog>
    </>
  );
};

export default ConnectedWallet;
