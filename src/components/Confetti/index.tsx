'use client';

import ReactConfetti, { Props as ConfettiProps } from 'react-confetti';
import useWindowDimensions from '@/hooks/useWindowDimensions';

interface Props extends Omit<ConfettiProps, 'drawShape' | 'height' | 'width'> {}

const Confetti = ({ run = false, numberOfPieces = 1000, recycle = false, ...props }: Props) => {
  const { height, width } = useWindowDimensions();

  return width !== undefined ? (
    <ReactConfetti
      {...props}
      run={run}
      width={width}
      height={height}
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
