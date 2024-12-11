'use client';

import { useDispatch } from 'react-redux';

import { closeDialog, openDialog } from '@/redux/features/dialogSlice';

import Profile from './Profile';
import AddressButton from './AddressButton';
import NewProfile from './NewProfile';

const ConnectedWallet = () => {
  const dispatch = useDispatch();

  const onCloseDialog = () => dispatch(closeDialog());

  const onOpenDialog = () =>
    dispatch(
      openDialog({
        content: <Profile onOpenChange={onCloseDialog} />,
      }),
    );

  const onOpenProfileDialog =() => dispatch(
    openDialog({
      content: <NewProfile onOpenChange={onCloseDialog} />,
    }),
  );

  return (
    <div className="flex">
      <AddressButton onOpenChange={onOpenDialog} />
      <button className="bg-primary-600 text-white" onClick={onOpenProfileDialog}>new profile</button>
    </div>
  );
};

export default ConnectedWallet;
