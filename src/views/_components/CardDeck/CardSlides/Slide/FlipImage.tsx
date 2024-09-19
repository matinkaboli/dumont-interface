import Image from 'next/image';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Icon } from '@/components';

const imgWidth = 200;
const imgHeight = 0;
const imgClassNames = 'mx-auto w-full h-full rounded-2xl';
const imgParentClassnames = 'w-full h-full absolute backface-hidden';
const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 40,
};

interface Props {
  backSrc: string;
  frontSrc: string;
  isRevealed?: boolean;
  isPlayerWinner?: boolean;
  isFreeReveal?: boolean;
}

const FlipImage = ({
  frontSrc,
  backSrc,
  isRevealed,
  isPlayerWinner = false,
  isFreeReveal = false,
}: Props) => {
  return (
    <div
      className="w-full h-full"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
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
        {!isFreeReveal && isRevealed && (
          <div className="absolute left-2.5 bottom-3.5">
            {isPlayerWinner ? (
              <Icon name="check-circle-fill" color="#C4C4CC" width="25" height="25" />
            ) : (
              <Icon name="xmark-circle-fill" color="#C4C4CC" width="22" height="22" />
            )}
          </div>
        )}
        <Image width={imgWidth} height={imgHeight} src={backSrc} className={imgClassNames} alt="" />
      </motion.div>
    </div>
  );
};

export default FlipImage;
