import Image from 'next/image';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Icon } from '@/components';
import { CSSProperties } from 'react';

const imgWidth = 200;
const imgHeight = 0;
const imgClassNames = 'mx-auto w-full h-full rounded-2xl';
const imgParentClassnames = 'w-full h-full absolute backface-hidden';
const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 40,
};
const parentStyle: CSSProperties = {
  perspective: '1200px',
  transformStyle: 'preserve-3d',
};

interface Props {
  backSrc: string;
  frontSrc: string;
  isRevealed?: boolean;
  isPlayerWinner?: boolean;
  isFreeReveal?: boolean;
  isActive?: boolean;
}

const FlipImage = ({
  frontSrc,
  backSrc,
  isRevealed,
  isPlayerWinner = false,
  isFreeReveal = false,
  isActive = false,
}: Props) => {
  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full" style={parentStyle}>
        {!isActive && (
          <div
            className="absolute z-20 inset-0 rounded-2xl"
            style={{ background: 'rgba(0, 0, 0, 0.56)' }}
          />
        )}

        <motion.div
          animate={{ rotateY: isRevealed ? -180 : 0 }}
          transition={spring}
          className={clsx(imgParentClassnames, isRevealed ? 'z-0' : 'z-10')}
        >
          <Image
            width={imgWidth}
            height={imgHeight}
            src={frontSrc}
            className={imgClassNames}
            alt=""
          />
        </motion.div>
        <motion.div
          initial={{ rotateY: 180 }}
          animate={{ rotateY: isRevealed ? 0 : 180 }}
          transition={spring}
          className={clsx(imgParentClassnames, isRevealed ? 'z-10' : 'z-0', 'relative')}
        >
          <Image
            width={imgWidth}
            height={imgHeight}
            src={backSrc}
            className={imgClassNames}
            alt=""
          />
        </motion.div>
      </div>

      {!isFreeReveal && isRevealed && (
        <div className="absolute z-30 left-2.5 bottom-3.5">
          {isPlayerWinner ? (
            <Icon name="check-circle-fill" color="#C4C4CC" width="25" height="25" />
          ) : (
            <Icon name="xmark-circle-fill" color="#C4C4CC" width="22" height="22" />
          )}
        </div>
      )}
    </div>
  );
};

export default FlipImage;
