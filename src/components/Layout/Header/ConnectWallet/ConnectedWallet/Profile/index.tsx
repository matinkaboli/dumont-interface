import { useState } from 'react';
import clsx from 'clsx';

import { Icon } from '@/components';

import MultiStepCarousel from './MultiStepCarousel';
import ProfileDetail from './steps/ProfileDetail';
import ConfirmSend from './steps/ConfirmSend';
import Receive from './steps/Receive';
import Send from './steps/Send';

export interface SendData {
  amount: string;
  address: string;
  token: string;
}

const Profile = ({ onOpenChange }: { onOpenChange: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [process, setProcess] = useState<'send' | 'receive'>('send');
  const [sendData, setSendData] = useState<SendData | undefined>(undefined);

  const prevSlide = () => {
    setDirection('prev');
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextSlide = () => {
    setDirection('next');
    setCurrentIndex(currentIndex + 1);
  };

  const renderTitle = () => {
    if (currentIndex === 0) {
      return 'Profile';
    } else if (process === 'send') {
      if (currentIndex === 1) return 'Send';
      if (currentIndex === 2) return 'Confirm Send';
    } else if (process === 'receive' && currentIndex === 1) {
      return 'Receive';
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

        <h6 className="text-white text-center text-base font-semibold">{renderTitle()}</h6>
      </div>

      {process === 'send' ? (
        <MultiStepCarousel currentIndex={currentIndex} direction={direction}>
          <ProfileDetail
            onCloseDialog={onOpenChange}
            setProcess={setProcess}
            onNextSlide={nextSlide}
          />
          <Send onNextSlide={nextSlide} setSendData={setSendData} />
          <ConfirmSend sendData={sendData} />
        </MultiStepCarousel>
      ) : (
        <MultiStepCarousel currentIndex={currentIndex} direction={direction}>
          <ProfileDetail
            onCloseDialog={onOpenChange}
            setProcess={setProcess}
            onNextSlide={nextSlide}
          />
          <Receive />
        </MultiStepCarousel>
      )}
    </>
  );
};

export default Profile;
