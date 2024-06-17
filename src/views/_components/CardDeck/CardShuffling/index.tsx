import { Dispatch, SetStateAction, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import clsx from 'clsx';

import { Card } from '@/redux/features/gameSlice';

import { cardSizeStyles } from '../.';

const variants = {
  hidden: () => ({ scale: 1.5, y: -1000, rotate: 0 }),
  visible: (i: number) => ({
    scale: 1,
    y: i * 1.5,
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
  cards: Card[];
  setShowSlider: Dispatch<SetStateAction<boolean>>;
}

const CardShuffling = ({ cards, setShowSlider }: Props) => {
  const controls = useAnimationControls();
  const startAnimation = async () => {
    await controls.start('visible');

    await controls.start('shuffle');

    await controls.start('final');

    setShowSlider(true);
  };

  useEffect(() => {
    setShowSlider(false);
    startAnimation();
  }, []);

  return (
    <div className="relative mx-auto">
      <motion.div
        variants={variants}
        animate={controls}
        className="absolute left-0 right-0 top-6 mx-auto w-52"
      >
        {cards.map((card, i) => (
          <motion.div
            key={card._id}
            custom={i}
            variants={variants}
            initial="hidden"
            animate={controls}
            className={clsx(
              'absolute rounded-2xl',
              cardSizeStyles.height.fakeCard,
              cardSizeStyles.width.fakeCard,
            )}
          >
            <div
              className="w-full h-full bg-cover bg-center rounded-2xl"
              style={{ backgroundImage: `url("/images/card.png")` }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CardShuffling;
