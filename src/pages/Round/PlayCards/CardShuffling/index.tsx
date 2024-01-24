import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const variants = {
  hidden: () => ({ scale: 1.5, y: -1000, rotate: 0 }),
  visible: (i: number) => ({
    scale: 1,
    y: i * 4,
    transition: { delay: i * 0.1, duration: 1 },
    rotate: -10 + Math.random() * 20,
  }),
  shuffle: (i: number) => ({
    y: 0,
    x: (i % 2 === 0 ? 1 : -1) * 227 * Math.ceil(i / 2),
    transition: { duration: 0.8, ease: 'linear', staggerChildren: 0.2 },
    rotate: 0,
  }),
  final: {
    opacity: 0,
    transition: { duration: 1 },
  },
};

interface Props {
  cards: string[];
  onLoading: () => void;
  setShowSlider: Dispatch<SetStateAction<boolean>>
}

const CardShuffling = ({ cards, onLoading, setShowSlider }: Props) => {
  const controls = useAnimationControls();
  const startAnimation = async () => {
    await controls.start('visible');

    await controls.start('shuffle');

    await controls.start('final');

    setShowSlider(true)

    onLoading();
  };

  useEffect(() => {
    setShowSlider(false);
    startAnimation();
  }, []);

  return (
    <div className="relative min-h-[265px] mx-auto">
      <motion.div
        variants={variants}
        animate={controls}
        className="absolute left-0 right-0 mx-auto w-[200px]"
      >
        {cards.map((card, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={variants}
            initial="hidden"
            animate={controls}
            className="absolute h-[265px] w-[190px] rounded-2xl"
          >
            <div
              className="w-full h-full bg-cover bg-center rounded-2xl"
              style={{ backgroundImage: `url("${card}")` }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CardShuffling;
