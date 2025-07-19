import { useState } from 'react';
import { useBalance } from 'wagmi';
import clsx from 'clsx';

import { Icon } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { DEFAULT_ADDRESS } from '@/constants/static';

import MultiStepCarousel from './MultiStepCarousel';
import ProfileDetail from './steps/ProfileDetail';
import ConfirmSend from './steps/ConfirmSend';
import Receive from './steps/Receive';
import Send from './steps/Send';

export type Token = 'USDC' | 'MONT';

export interface SendData {
  amount: string;
  address: string;
  token: Token;
}

export interface Balance {
  eth?: string;
  mont?: string;
  usdc?: string;
}

const Profile = ({ onOpenChange }: { onOpenChange: () => void }) => {
  const {
    balance,
    profile: { address },
  } = useTypedSelector((state) => state.account);
  const { details } = useTypedSelector((state) => state.config);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [process, setProcess] = useState<'send' | 'receive'>('send');
  const [sendData, setSendData] = useState<SendData | undefined>(undefined);
  const [removeSlideTitle, setRemoveSlideTitle] = useState(false);

  const { data: montBalance } = useBalance({ address, token: DEFAULT_ADDRESS });
  const { data: ethBalance } = useBalance({ address });
  const accountBalance: Balance = {
    usdc: balance,
    mont: montBalance?.formatted,
    eth: ethBalance?.formatted,
  };

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

  const onRemoveSlideTitle = () => setRemoveSlideTitle(true);

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
      {!removeSlideTitle ? (
        <div className="grid grid-cols-3 -mt-[18px]">
          <button
            onClick={prevSlide}
            className={clsx('mr-auto text-white', currentIndex > 0 ? 'visible' : 'invisible')}
          >
            <Icon name="arrow-left" color="#ADADB6" />
          </button>

          <h6 className="text-white text-center text-base font-semibold">{renderTitle()}</h6>
        </div>
      ) : null}

      {process === 'send' ? (
        <MultiStepCarousel currentIndex={currentIndex} direction={direction}>
          <ProfileDetail
            accountBalance={accountBalance}
            onCloseDialog={onOpenChange}
            setProcess={setProcess}
            onNextSlide={nextSlide}
          />
          <Send balances={accountBalance} onNextSlide={nextSlide} setSendData={setSendData} />
          <ConfirmSend removeSlideTitle={onRemoveSlideTitle} sendData={sendData} />
        </MultiStepCarousel>
      ) : (
        <MultiStepCarousel currentIndex={currentIndex} direction={direction}>
          <ProfileDetail
            accountBalance={accountBalance}
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
