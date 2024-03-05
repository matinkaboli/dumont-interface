import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import clsx from 'clsx';

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
}

const FlipImage = ({ frontSrc, backSrc }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped((prevState) => !prevState);
  };

  return (
    <div
      className="w-full h-full"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
      onClick={handleClick}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? -180 : 0 }}
        transition={spring}
        className={clsx(imgParentClassnames, isFlipped ? 'z-0' : 'z-10')}
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
        animate={{ rotateY: isFlipped ? 0 : 180 }}
        transition={spring}
        className={clsx(imgParentClassnames, isFlipped ? 'z-10' : 'z-0')}
      >
        <Image width={imgWidth} height={imgHeight} src={backSrc} className={imgClassNames} alt="" />
      </motion.div>
    </div>
  );
};

export default FlipImage;
