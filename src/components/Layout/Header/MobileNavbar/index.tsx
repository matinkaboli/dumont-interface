'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from '@studio-freight/react-lenis';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { useMobileNav } from '@/contexts/MobileNavContext';

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
  const lenis = useLenis();
  const { isNavOpen, toggleNav } = useMobileNav();
  const MotionedButton = motion(Button);

  useEffect(() => {
    const setVh = () => {
      // First we get the viewport height, and we multiply it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();

    window.addEventListener('resize', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = 'visible';
      lenis?.start();
    }
  }, [isNavOpen]);

  return (
    <>
      <ToggleButton isOpen={isNavOpen} toggleMenu={toggleNav} />

      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            variants={menuVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='fixed z-10 inset-0 w-full h-screen-optimized origin-top bg-neutral-800 text-white px-6 pt-12 pb-8'
          >
            <motion.div
              variants={containerVariants}
              initial='initial'
              animate='open'
              exit='initial'
              className='flex flex-col h-full gap-14 pt-28 pb-8'
            >
              {navLinks.map((link) => (
                <div key={link.id} className='overflow-hidden'>
                  <NavLink
                    title={link.title}
                    href={link.href}
                    target={link.target}
                    onClick={toggleNav}
                  />
                </div>),
              )}

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
