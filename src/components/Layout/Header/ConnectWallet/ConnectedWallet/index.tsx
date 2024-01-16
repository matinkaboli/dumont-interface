'use client';

import { useDispatch } from 'react-redux';

import { closeDialog, openDialog } from '@/redux/features/dialogSlice';

import Profile from './Profile';
import AddressButton from './AddressButton';

const ConnectedWallet = () => {
  const dispatch = useDispatch();

  const onCloseDialog = () => dispatch(closeDialog());

  const onOpenDialog = () =>
    dispatch(
      openDialog({
        content: <Profile onOpenChange={onCloseDialog} />,
      }),
    );

  return <AddressButton onOpenChange={onOpenDialog} />;
};

export default ConnectedWallet;
