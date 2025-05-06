import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const MultiStepCarousel = ({
  children,
  currentIndex,
  direction
}: {
  children: ReactNode[];
  currentIndex: number;
  direction: 'prev'| 'next';
}) => {
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: direction === 'next' ? 15 : -15  }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction === 'next' ? -15 : 15  }}
        transition={{
          x: {
            type: 'tween',
            duration: 0.2,
          },
          opacity: {
            duration: 0.3,
          },
        }}
        className="w-full h-full"
      >
        {children[currentIndex]}
      </motion.div>
    </AnimatePresence>
  );
};

export default MultiStepCarousel;
