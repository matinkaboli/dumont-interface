'use client';

import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
interface Props extends PropsWithChildren {
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
}

const FadeInUp = ({ children, tag = 'div', className }: Props) => {
  // @ts-ignore
  const MotionComponent = motion[tag] || motion.div;

  return (
    <MotionComponent
      className={className}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0,  }}
      viewport={{ once: true }}
      exit={{ opacity: 0, y: 70 }}
      transition={{
        type: 'spring',
        damping: 15,
        mass: 0.75,
        stiffness: 30,
      }}
    >
      {children}
    </MotionComponent>
  );
};

export default FadeInUp;
