import React from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

import { Button } from '@/components';
import { closeDialog } from '@/redux/features/dialogSlice';

interface Props {
  status: 'success' | 'failure';
}

interface Message {
  title: string;
  content: React.ReactNode;
  buttonText: string;
}

const ResultMessage = ({ status }: Props) => {
  const dispatch = useDispatch();

  const message: Message =
    status === 'success'
      ? {
          title: 'You won! 🎉',
          content: (
            <p className="text-white text-md">
              Enjoy your <b className="text-success-400">$2,080 win</b> <b>in your wallet</b>
            </p>
          ),
          buttonText: 'Got it',
        }
      : {
          title: 'No luck this time 💔',
          content: (
            <p className="text-sm text-neutral-200 px-0 md:px-5">
              You didn’t win this one, but you still got
              <span className="text-success-400"> +1,200</span> $MONT in rewards.
            </p>
          ),
          buttonText: 'Try the next',
        };

  const onCloseDialog = () => dispatch(closeDialog());

  return (
    <>
      <Image src="/images/card.png" width={160} height={223} className="mx-auto" alt="" />
      <h3 className="text-xl text-white text-center font-bold mt-6">{message.title}</h3>

      <div className="mt-2 text-center">{message.content}</div>

      {status === 'success' && (
        <div className="mt-6 bg-neutral-600 text-center text-base text-white font-medium rounded-lg py-1">
          <span className="text-white">+1,200 MONT</span>
          <span className="text-neutral-400"> in reward.</span>
        </div>
      )}

      <Button fullWidth size="md" radius="lg" className="mt-8" onClick={onCloseDialog}>
        {message.buttonText}
      </Button>
    </>
  );
};
export default ResultMessage;
