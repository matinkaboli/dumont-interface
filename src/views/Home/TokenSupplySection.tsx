'use client';

import { PlayerEvents } from '@dotlottie/react-player';

import { Button, FadeInUp, LottiePlayer, Typography } from '@/components';
import { useLottieContext } from '@/contexts/LottieContext';
import links from '@/constants/externalLinks';

import GradiantBadge from './_components/GradiantBadge';
import FollowLink from './_components/FollowLink';
import BlurBadge from './_components/BlurBadge';

const TokenSupplySection = () => {
  const { onLottieLoad } = useLottieContext();

  return (
    <div className='grid md:grid-cols-2 grid-cols-1 items-center lg:gap-0 gap-16 md:py-56 py-36'>
      <FadeInUp>
        <GradiantBadge icon='circle-dollar' label='MONT token' className='w-fit' />
        <Typography tag='h2' variant='title1' className='mt-6'>Tap to the house benefit</Typography>
        <Typography variant='subTitle2' className='mt-2'>Get your share of the game revenue</Typography>
        <Typography tag='p' variant='body1' className='mt-6'>
          Thanks to our burning mechanism, everyone can benefit from the system’s revenue by purchasing and holding
          $MONT.
        </Typography>
        <div className='flex items-center md:mt-10 mt-8 gap-10'>
          <Button
            variant='link'
            size='md'
            radius='lg'
            className='bg-primary-500 hover:bg-primary-400 transition duration-75 ease-in-out text-primary-250 font-bold whitespace-nowrap'>
            Buy $MONT
          </Button>
          <FollowLink
            href={links.BURNING_MECHANISM}
            label='How it works'
            className='font-semibold text-base'
          />
        </div>
      </FadeInUp>

      <FadeInUp className='max-w-[456px] w-full md:ml-auto ml-0'>
        <LottiePlayer
          loop
          autoplay
          width='160px'
          height='185px'
          src='/lottie/mont.lottie'
          className='-ml-5'
          style={{ width: '100%', height: '100%', maxWidth: '160px', maxHeight: '185px' }}
          onEvent={(event: PlayerEvents) => {
            if (event === PlayerEvents.Ready) {
              onLottieLoad();
            }
          }}
        />
        <div className='flex flex-col gap-2 mt-3'>
          <div className='text-lg text-neutral-400'>Total Amount Burned</div>
          <h4 className='xl:text-5xl text-4xl text-primary-250 font-bold'>120,930 MONT</h4>
          <BlurBadge>From <b>$15,000</b> of collected fees</BlurBadge>
        </div>
      </FadeInUp>
    </div>
  );
};

export default TokenSupplySection;
