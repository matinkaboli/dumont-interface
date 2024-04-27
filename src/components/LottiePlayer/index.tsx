'use client';

import { DotLottiePlayer, Props } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

interface LottiePlayerProps extends Props {
  width?: string;
  height?: string;
  className?: string;
}

const LottiePlayer = ({ src, width = '100%', height = '100%', className = '', ...props }: LottiePlayerProps) => {
  return (
    <DotLottiePlayer
      src={src}
      className={className}
      style={{ width, height }}
      {...props}
    />
  );
};

export default LottiePlayer;
