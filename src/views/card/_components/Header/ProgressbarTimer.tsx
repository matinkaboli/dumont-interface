'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'motion/react';
import { toast } from 'react-toastify';

import { ToastContent, ToastWrapper } from '@/components';
import { AppDispatch } from '@/redux/store';
import { expireGame } from '@/redux/features/faro/faroSlice';
import formatDurationFromSeconds from '@/helpers/formatDurationFromSeconds';

const ProgressbarTimer = ({ duration, initialTime }: { duration: number; initialTime: number }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [remainingTime, setRemainingTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    if (remainingTime <= -1) {
      clearInterval(timer);
      dispatch(expireGame(true));
      toast(
        <ToastWrapper>
          <ToastContent variant='neutral' title='Expired!' description='Your game has expired.' />
        </ToastWrapper>,
        { position: 'bottom-right', toastId: 'expired' },
      );
    }

    return () => clearInterval(timer);
  }, [remainingTime]);

  const progressBarWidth = useMemo(() => {
    return initialTime <= 0 ? 0 : (remainingTime / duration) * 100;
  }, [initialTime, remainingTime, duration]);

  return (
    <div
      className='relative bg-neutral-800 flex-center h-10 w-32 border-[1.5px] border-neutral-700 rounded-md overflow-hidden'>
      <div className='text-sm text-center'>
        <span className='inline-block w-1.5 h-1.5 rounded-full bg-primary-250' />
        <span className={remainingTime <= -1 ? 'text-neutral-400' : 'text-primary-250'}>
          {remainingTime <= -1 ? 'No time ' : <b>{formatDurationFromSeconds(remainingTime)}</b>}
        </span>
        <span className='text-neutral-400'> has left</span>
      </div>

      <div className='h-0.5 rounded-xl w-full bg-neutral-600 overflow-hidden absolute bottom-0 inset-x-0'>
        <motion.div
          initial={{ width: `${progressBarWidth}%` }}
          animate={{ width: '0%' }}
          transition={{ duration: initialTime }}
          className='absolute top-0 left-0 h-0.5 w-full rounded-xl bg-primary-300 transition-height ease-in-out duration-150'
        />
      </div>
    </div>
  );
};

export default ProgressbarTimer;
