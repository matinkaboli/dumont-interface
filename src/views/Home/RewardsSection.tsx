import Image from 'next/image';

import GradiantBadge from './_components/GradiantBadge';
import FollowLink from './_components/FollowLink';
import { Typography } from '@/components';

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
          href='/'
          label='Learn more'
          className='font-semibold text-base mt-9'
        />
      </div>
      <div className='md:mt-0 -mt-10'>
        <Image
          width='0'
          height='0'
          sizes='100vw'
          className='w-auto lg:h-[420px] md:h-96 h-56 absolute right-0 bottom-0'
          src='/images/bg-circle.png'
          alt=''
        />

        <Image
          width='0'
          height='0'
          sizes='100vw'
          className='lg:w-72 md:w-60 w-44 h-auto relative ml-auto'
          src='/images/rewards.png'
          alt=''
        />
      </div>
    </div>

  );
};

export default RewardsSection;
