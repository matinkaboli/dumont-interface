'use client';

import { Key, useEffect, useState } from 'react';
import ReactConfetti, { IConfettiOptions } from 'react-confetti';
import clsx from 'clsx';

export interface ConfettiProps extends Omit<IConfettiOptions, 'drawShape' | 'height' | 'width' | 'tweenDuration'> {
  className?: string;
  key?: Key;
}

const Confetti = ({ run = false, numberOfPieces = 1000, recycle = false, className = '', ...props }: ConfettiProps) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.body.clientHeight,
          document.documentElement.clientHeight,
        ),
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('scroll', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('scroll', updateDimensions);
    };
  }, []);

  return dimensions.width > 0 ? (
    <ReactConfetti
      {...props}
      run={run}
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={numberOfPieces}
      recycle={recycle}
      tweenDuration={2000}
      className={clsx('!z-[45]', className)}
      drawShape={(ctx) => {
        ctx.beginPath();
        ctx.rect(-10, -5, 12, 5);
        ctx.fill();
      }}
    />
  ) : null;
};

export default Confetti;
