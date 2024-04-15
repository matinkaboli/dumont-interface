'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Button from '@/components/Button';
import Icon from '@/components/Icon';

import NavLink from './NavLink';
import ToggleButton from './ToggleButton';
import { navLinks } from '../.';

const menuVariants = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.12, 0, 0.39, 0],
    },
  },
  exit: {
    scaleY: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const containerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.09,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
};

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  const MotionedButton = motion(Button);
  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <>
      <ToggleButton isOpen={open} toggleMenu={toggleMenu} />

      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='fixed left-0 top-0 w-full h-screen origin-top bg-neutral-800 text-white px-6 pt-12 pb-8'
          >
            <motion.div
              variants={containerVariants}
              initial='initial'
              animate='open'
              exit='initial'
              className='flex flex-col h-full gap-14 mt-28'
            >
              {navLinks.map((link, index) => {
                return (
                  <div key={link.id} className='overflow-hidden'>
                    <NavLink
                      title={link.title}
                      href={link.href}
                    />
                  </div>
                );
              })}

              <MotionedButton
                radius='lg'
                rightSection={<Icon name='angle-right' />}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.7 } }}
                exit={{ opacity: 0 }}
                className='absolute bottom-8 right-6 left-6'>
                Start playing
              </MotionedButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;
