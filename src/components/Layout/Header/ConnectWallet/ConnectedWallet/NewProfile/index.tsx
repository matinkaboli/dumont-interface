import React, { useState } from 'react';
import clsx from 'clsx';

import { Icon } from '@/components';

import MultiStepCarousel from './MultiStepCarousel';
import ProfileDetail from './ProfileDetail';
import Receive from './Receive';
import Send from '@/components/Layout/Header/ConnectWallet/ConnectedWallet/NewProfile/Send';

const NewProfile = ({ onOpenChange }: { onOpenChange: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [process, setProcess] = useState<'send' | 'receive'>('send');

  const prevSlide = () => {
    setDirection('prev');
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextSlide = () => {
    setDirection('next');
    if (currentIndex < 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 -mt-[18px]">
        <button
          onClick={prevSlide}
          className={clsx('mr-auto text-white', currentIndex > 0 ? 'visible' : 'invisible')}
        >
          <Icon name="arrow-left" color="#ADADB6" />
        </button>

        <h6 className="text-white text-center text-base font-semibold">Profile</h6>

        <button onClick={nextSlide} className={clsx('ml-auto text-white')}>
          next
        </button>
      </div>

      <MultiStepCarousel currentIndex={currentIndex} direction={direction}>
        {/*<div>*/}
        {/*  <ProfileDetail*/}
        {/*    onCloseDialog={onOpenChange}*/}
        {/*    setProcess={setProcess}*/}
        {/*    onNextSlide={nextSlide}*/}
        {/*  />*/}
        {/*</div>*/}

        <div><Send /></div>
        {process === 'send' ? (
          <div><Send /></div>
        ) : (
          <div>
            <Receive />
          </div>
        )}
      </MultiStepCarousel>
    </>
  );
};

export default NewProfile;
