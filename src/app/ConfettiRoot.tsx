'use client';

import { useDispatch, useSelector } from 'react-redux';
import { ConfettiState, hideConfetti } from '@/redux/features/confettiSlice';

import { Confetti } from '@/components';

interface RootState {
  confetti: ConfettiState;
}

const ConfettiRoot = () => {
  const dispatch = useDispatch();
  const { isActive, confettiProps } = useSelector((state: RootState) => state.confetti);

  const handleComplete = () => {
    if (confettiProps?.onConfettiComplete) confettiProps.onConfettiComplete();

    dispatch(hideConfetti());
  };

  if (!isActive) return null;

  return (
    <>
      <Confetti
        {...confettiProps}
        run={isActive}
        onConfettiComplete={handleComplete}
      />
    </>
  );
};

export default ConfettiRoot;
