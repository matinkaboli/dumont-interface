'use client';

import Image from 'next/image';
import { Parallax } from 'react-scroll-parallax';

import { Typography } from '@/components';
import links from '@/constants/externalLinks';

import GradiantBadge from './_components/GradiantBadge';
import FollowLink from './_components/FollowLink';

const RewardsSection = () => {
  return (
    <div
      className='relative bg-gradiant-dark grid md:grid-cols-2 grid-cols-1 items-center sm:rounded-3xl rounded-none xl:px-24 lg:px-8 px-4 xl:py-20 py-12 sm:mx-0 -mx-4'>
      <div>
        <GradiantBadge icon='circle-dollar' label='MONT rewards' className='w-fit' />
        <Typography tag='h3' variant='title1' className='mt-6 sm:whitespace-nowrap whitespace-normal'>
          Play and get rewards
        </Typography>
        <Typography variant='subTitle2' className='mt-2'>Get free $MONT from playing</Typography>

        <div className='flex border-t border-b border-neutral-700 mt-8'>
          <div className='py-4 md:pr-8 pr-4 border-r border-neutral-700'>
            <div className='text-xl font-bold text-primary-250'>20,00,000 MONT</div>
            <div className='text-sm text-neutral-400 font-medium'>Total Reward Distributed</div>
          </div>
          <div className='py-4 md:px-8 px-4'>
            <div className='text-xl font-bold text-primary-250'>2,320</div>
            <div className='text-sm text-neutral-400 font-medium'>Recipient Users</div>
          </div>
        </div>

        <Typography tag='p' variant='body1' className='mt-8'>
          A significant portion of $MONT supply is allocated for player
          You can get your share by playing in the game or inviting your friends.
        </Typography>

        <FollowLink
          href={links.REWARD_PROGRAM}
          label='Learn more'
          className='font-semibold text-base mt-9'
        />
      </div>

      <div className='md:mt-0 -mt-10'>
        <Image
          width='0'
          height='0'
          sizes='100vw'
          className='w-auto xl:h-[500px] md:h-96 h-56 absolute right-0 bottom-0 md:block hidden'
          src='/images/bg-circle.png'
          alt=''
        />

        <div className='min-h-[292px] md:hidden block'>
          <Image
            src='/images/rewards-mobile.png'
            className='absolute right-0 bottom-0'
            width={292}
            height={366}
            alt=''
          />
        </div>

        <div className='w-[290px] h-[353px] relative ml-auto md:block hidden'>
          <Image
            src='/images/fade-coin-top.png'
            className='absolute top-0 right-20'
            width={81}
            height={97}
            alt=''
          />

          <Image
            src='/images/fade-coin-bottom.png'
            className='absolute bottom-0 right-3'
            width={73}
            height={97}
            alt=''
          />

          <div className='absolute bottom-5 left-0'>
            <Parallax translateY={[-20, 20]} speed={5}>
              <Image src='/images/wrapped-gift.png' width={162} height={176} alt='' />
            </Parallax>
          </div>

          <div className='absolute top-5 right-0'>
            <Parallax translateY={[0, 30]} speed={-5}>
              <Image src='/images/opened-gift.png' width={163} height={182} alt='' />
            </Parallax>
          </div>

          <div className='absolute top-8 left-2'>
            <Parallax translateY={[-30, 10]}>
              <Image src='/images/rotated-coin.png' width={120} height={120} alt='' />
            </Parallax>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsSection;
