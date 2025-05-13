'use client';

import { PropsWithChildren } from 'react';
import { motion } from 'motion/react';

const AnimatedDialogContent = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: 'easeInOut',
        type: 'spring',
        stiffness: 150,
        damping: 20,
        mass: 1,
        delay: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedDialogContent;
