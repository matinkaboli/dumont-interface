'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import { DialogTitle, Icon } from '@/components';

const moveSize = 40;

const items = [
  'Sending transaction',
  'Confirming transaction',
  'Pending operator’s action',
  'Confirming cards data',
  'Finalizing round creation',
];

interface Props {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

function LongLoadingContent({ activeIndex, setActiveIndex }: Props) {

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        if (prevIndex < 4) {
          return prevIndex + 1;
        } else {
          clearInterval(interval);
          return prevIndex;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <DialogTitle className="text-center">Creating the round</DialogTitle>
      <div className="relative h-44 overflow-hidden px-14 mt-8">
        <motion.div
          className="absolute"
          style={{ top: `-${activeIndex * moveSize}px` }}
          transition={{ duration: 1, type: 'tween' }}
          animate={{ top: `-${activeIndex * moveSize}px` }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className={clsx(
                'text-white text-base my-7 flex gap-4',
                activeIndex === index ? 'font-semibold' : '',
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Icon name={index <= activeIndex ? 'check-circle-fill' : 'check-circle'} />
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}

export default LongLoadingContent;
