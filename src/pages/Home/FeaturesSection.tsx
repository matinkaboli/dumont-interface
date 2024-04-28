import Image from 'next/image';

import { Typography, FadeInUp } from '@/components';

import GradiantBadge from './_components/GradiantBadge';
import FollowLink from './_components/FollowLink';
import BlurBadge from './_components/BlurBadge';

const FeaturesSection = () => {
  return (
    <>
      <div className='grid md:grid-cols-2 grid-cols-1 items-center md:gap-0 gap-14 md:py-48 py-16'>
        <FadeInUp>
          <GradiantBadge icon='circle-dollar' label='True randomness' className='w-fit' />
          <Typography tag='h3' variant='title2' className='mt-6'>Immutable outcomes</Typography>
          <Typography variant='subTitle1' className='mt-2'>
            No possibility of operator cheating
          </Typography>
          <Typography tag='p' variant='body1' className='mt-6'>
            We designed an innovative cryptography mechanism that proves game
            results are random and safe against manipulation.
          </Typography>
          <FollowLink
            href='/'
            label='How it works'
            className='font-semibold text-base mx-auto md:mt-14 mt-8'
          />
        </FadeInUp>
        <FadeInUp>
          <Image
            height='0'
            width='0'
            sizes='100vw'
            src='/images/immutable.png'
            className='w-full max-w-[454px] h-auto md:ml-auto md:mr-0 mx-auto'
            alt='dumont'
          />
        </FadeInUp>
      </div>

      <div className='grid md:grid-cols-2 grid-cols-1 items-center xl:gap-0 lg:gap-4 gap-14 md:py-48 py-16'>
        <FadeInUp className='md:order-1 order-2'>
          <Image
            height='0'
            width='0'
            sizes='100vw'
            src='/images/Permissionless.png'
            className='w-full max-w-[400px] h-auto md:mx-0 mx-auto'
            alt='dumont'
          />
        </FadeInUp>
        <FadeInUp className='md:order-2 order-1'>
          <GradiantBadge icon='circle-dollar' label='immediate payouts' className='w-fit' />
          <Typography tag='h3' variant='title2' className='mt-6'>Permissionless payouts</Typography>
          <Typography variant='subTitle1' className='mt-2'>No need for operator permission</Typography>
          <Typography tag='p' variant='body1' className='mt-6'>
            Your winning amounts are immediately and automatically sent to your address by the blockchain-based smart
            contract.
          </Typography>
          <BlurBadge className='mt-6'><b>$10,230,000</b> bet settled so far</BlurBadge>
        </FadeInUp>
      </div>
    </>
  );
};

export default FeaturesSection;
