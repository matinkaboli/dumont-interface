'use client';

import { useEffect, useRef, useState } from 'react';
import { PlayerEvents } from '@dotlottie/react-player';
import clsx from 'clsx';

import { LottiePlayer, Typography } from '@/components';
import { useMobileNav } from '@/contexts/MobileNavContext';
import { useLottieContext } from '@/contexts/LottieContext';

import PlayButton from '@/views/_components/PlayButton';


const HeaderSection = () => {
  const lottieRef = useRef<any>();
  const [play, setPlay] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const { isNavOpen } = useMobileNav();
  const { onLottieLoad } = useLottieContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlay(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (play && !isLoading) {
      lottieRef?.current?.play();
    }
  }, [play, isLoading]);

  return (
    <div className='grid md:grid-cols-2 grid-cols-1 items-center gap-14 md:pt-28 pt-12 md:pb-40 pb-6'>
      <div>
        <Typography tag='h1' variant='title1' className='tracking-tight'>
          A
          <span className='bg-gradiant-header-text text-transparent bg-clip-text'> Provably Fair </span>
          <br className='md:block hidden' />
          Gambling System
        </Typography>
        <Typography tag='p' variant='body1' className='mt-4'>
          Dumont is a blockchain-based card game that guarantees immutable outcomes and permissionless payout for
          players.
        </Typography>
        <PlayButton className='mt-12' />
      </div>
      <div>
        <LottiePlayer
          lottieRef={lottieRef}
          loop
          width='455px'
          height='455px'
          src='/lottie/header.lottie'
          background='/images/bg-circle.png'
          className={clsx('md:ml-auto md:mr-0 mx-auto md:mt-0 mt-14', isNavOpen ? 'invisible' : 'visible')}
          style={{ width: '100%', height: '100%', maxWidth: '445px', maxHeight: '445px' }}
          onEvent={(event: PlayerEvents) => {
            if (event === PlayerEvents.Ready) {
              setLoading(false);
              onLottieLoad();
            }
          }}
        />
      </div>
    </div>
  );
};

export default HeaderSection;
