'use client';

import { useEffect, useRef, useState } from 'react';
import { PlayerEvents } from '@dotlottie/react-player';

import { LottiePlayer, Typography } from '@/components';
import PlayButton from '@/views/_components/PlayButton';
import { useLoadingStore } from '@/stores/loadingStore';


const HeaderSection = () => {
  const lottieRef = useRef<any>();
  const [play, setPlay] = useState(false);
  const isLoading = useLoadingStore((state) => state.isLoading);
  const setLoading = useLoadingStore((state) => state.setLoading);

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
          className="ml-auto"
          onEvent={(event: PlayerEvents) => {
            if (event === PlayerEvents.Ready) {
              setLoading(false);
            }
          }}
        />
      </div>
    </div>
  );
};

export default HeaderSection;
