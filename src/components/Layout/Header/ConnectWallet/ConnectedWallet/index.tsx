'use client';

import { useState } from 'react';
import { Dialog } from '@/components';
import Profile from './Profile';
import AddressButton from './AddressButton';

interface Props {
  address?: string;
  truncatedAddress?: string;
  balance?: string;
}

const ConnectedWallet = ({ address, truncatedAddress, balance }: Props) => {
  const [open, setOpen] = useState(false);
  const onOpenChange = () => setOpen((prev) => !prev);

  return (
    <>
      <AddressButton
        balance={balance}
        truncatedAddress={truncatedAddress}
        onOpenChange={onOpenChange}
      />

      <Dialog open={open} onOpenChange={onOpenChange} showCloseButton>
        <Profile
          address={address}
          truncatedAddress={truncatedAddress}
          onOpenChange={onOpenChange}
        />
      </Dialog>
    </>
  );
};

export default ConnectedWallet;
