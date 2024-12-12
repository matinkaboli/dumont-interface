import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { useDisconnect } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';
import clsx from 'clsx';

import { Button, Icon, QRCode } from '@/components';
import links from '@/constants/links';
import useAxiosGet from '@/hooks/useAxiosGet';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import truncateString from '@/helpers/truncateString';

import BalanceList from '../Profile/BalanceList';
import CopyBox from '../Profile/CopyBox';
import MultiStepCarousel from './MultiStepCarousel';

interface ReferralData {
  id: number;
}

const NewProfile = ({ onOpenChange }: { onOpenChange: () => void }) => {
  const { address } = useTypedSelector((state) => state.account.profile);
  const { data: referralData } = useAxiosGet<ReferralData>(`players/${address}/referrals`);
  const { disconnectAsync } = useDisconnect();
  const { logout } = usePrivy();

  const referralLink = referralData ? `${links.APP}/i/${referralData?.id}` : '';

  const onDisconnect = async () => {
    try {
      await disconnectAsync();
      await logout();
      onOpenChange();
    } catch (error) {}
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

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
        <div className="w-full">
          <CopyBox
            className="w-full mt-8"
            copyText={address || ''}
            copyLabel={truncateString(address || '', { leftChars: 6, rightChars: 4 })}
            copyIcon={<Image src="/images/account.svg" width={24} height={24} alt="account" />}
          />

          <div className="flex gap-4 mt-8">
            <Button fullWidth radius="lg" leftSection={<Icon name="arrow-up" />}>
              Send
            </Button>
            <Button
              fullWidth
              variant="secondary"
              radius="lg"
              leftSection={<Icon name="arrow-down" />}
              onClick={nextSlide}
            >
              Receive
            </Button>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <h6 className="text-sm text-neutral-300 font-semibold">Balance</h6>
            <BalanceList />
          </div>

          <div className="flex flex-col gap-2 mt-10">
            <h6 className="text-sm text-neutral-300 font-semibold">Invite Link</h6>
            <CopyBox
              copyText={referralLink}
              copyLabel={referralLink}
              copyIcon={<Icon name="link" />}
            />
          </div>
          <Button
            fullWidth
            variant="link"
            radius="lg"
            className="text-error-400 font-semibold text-base mt-8 mx-auto !px-0 hover:bg-neutral-600"
            leftSection={<Icon name="arrow-right-from-bracket" />}
            onClick={onDisconnect}
          >
            Disconnect
          </Button>
        </div>
        <div className="">
          <QRCode value={address || ''} size={192} className="mx-auto mt-8" />
          <CopyBox
            className="mx-auto mt-6"
            copyText={address || ''}
            copyLabel={truncateString(address || '', { leftChars: 8, rightChars: 8 })}
          />
          <Button
            asChild
            fullWidth
            radius="lg"
            variant="link"
            className="mt-14 -mb-8 h-14 !font-medium text-base text-white bg-neutral-600 flex justify-between"
          >
            <Link href="/" target="_blank">
              <span className="flex items-center gap-2">
                <Image width={44} height={28} src="/images/fiat.svg" alt="" />
                Buy crypto with fiat
              </span>
              <Icon name="arrow-up-right" color="#EA00FF" />
            </Link>
          </Button>
        </div>
      </MultiStepCarousel>
    </>
  );
};

export default NewProfile;
