'use client';

import { useState } from 'react';

import { Dialog } from '@/components';

import Profile from './Profile';
import AddressButton from './AddressButton';

const ConnectedWallet = () => {
  const [open, setOpen] = useState(false);
  const onOpenChange = () => setOpen((prev) => !prev);

  return (
    <>
      <AddressButton onOpenChange={onOpenChange} />

      <Dialog open={open} onOpenChange={onOpenChange} showCloseButton>
        <Profile onOpenChange={onOpenChange} />
      </Dialog>
    </>
  );
};

export default ConnectedWallet;
