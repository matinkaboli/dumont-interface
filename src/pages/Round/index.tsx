'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import CardDeck from '@/pages/_components/CardDeck';
import Board from '@/pages/_components/Board';
import { Toast, ToastContent } from '@/components';

import ActivityTab from './ActivityTab';
import ProgressbarTimer from './ProgressbarTimer';

const CreateRound = () => {
  const { isConfirmed } = useTypedSelector((state) => state.createRound);
  const { isConnected } = useTypedSelector((state) => state.account.profile);

  useEffect(() => {
    toast(
      <ToastContent
        variant="neutral"
        title="Good luck!"
        description="You have successfully created the round."
      />,
      { position: 'bottom-right' },
    );

    return () => {
      toast.dismiss();
    };
  }, []);

  if (!isConnected || !isConfirmed) {
    redirect('/');
  }

  return (
    <>
      <div className="px-1.5"><ProgressbarTimer /></div>

      <div className="flex flex-col gap-4">
        <CardDeck />
        <Board />
        <ActivityTab className="md:mt-16 mt-14" />
        <Toast />
      </div>
    </>
  );
};

export default CreateRound;
