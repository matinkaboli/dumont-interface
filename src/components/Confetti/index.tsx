'use client';

import React, { useEffect, useState } from 'react';
import ReactConfetti, { Props as ConfettiProps } from 'react-confetti';

interface Props extends Omit<ConfettiProps, 'drawShape' | 'height' | 'width'> {}

const Confetti = ({ run = false, numberOfPieces = 1000, recycle = false, ...props }: Props) => {
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
      drawShape={(ctx) => {
        ctx.beginPath();
        ctx.rect(-10, -5, 12, 5);
        ctx.fill();
      }}
    />
  ) : null;
};

export default Confetti;
