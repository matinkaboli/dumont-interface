import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
        initial={{ opacity: 0, x: direction === 'next' ? 20 : -20  }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction === 'next' ? -20 : 20  }}
        transition={{
          x: {
            type: 'tween',
            duration: 0.3,
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
