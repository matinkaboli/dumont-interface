'use client';

import { motion } from 'framer-motion';

const circleSize = 12;

const transition = {
  duration: 30,
  delay: 0.5,
  ease: 'easeInOut',
};

const progressVariants = {
  enter: {
    width: '100%',
    transition: {
      delay: 0,
      duration: 0,
    },
  },
  animate: {
    width: 0,
    transition,
  },
};

const circleVariants = {
  enter: {
    right: 0,
  },
  animate: {
    right: 0, // Start position
    left: 0, // End position
    transition,
  },
};

const ProgressbarTimer = () => {
  return (
    <div className="relative">
      <div className="h-0.5 rounded-xl w-full bg-neutral-500 overflow-hidden">
        <motion.div
          variants={progressVariants}
          initial="enter"
          animate="animate"
          exit="enter"
          className="absolute top-0 left-0 w-full h-full rounded-xl bg-primary-300"
        />
      </div>

      <motion.div
        variants={circleVariants}
        initial="enter"
        animate="animate"
        exit="enter"
        className="absolute h-full rounded-full bg-primary-250"
        style={{
          width: circleSize,
          height: circleSize,
          top: -(circleSize / 2),
        }}
      />
    </div>
  );
};

export default ProgressbarTimer;
