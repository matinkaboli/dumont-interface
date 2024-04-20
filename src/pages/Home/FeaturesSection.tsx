import Image from 'next/image';

import GradiantBadge from './_components/GradiantBadge';
import FollowLink from './_components/FollowLink';
import BlurBadge from './_components/BlurBadge';

const FeaturesSection = () => {
  return (
    <>
      <div className='grid md:grid-cols-2 grid-cols-1 items-center md:gap-0 gap-14 md:py-48 py-16'>
        <div>
          <GradiantBadge icon='circle-dollar' label='True randomness' className='w-fit' />
          <h3 className='title mt-6'>Immutable outcomes</h3>
          <div className='mt-2 md:text-2xl text-lg text-neutral-300'>No possibility of operator cheating</div>
          <p className='description-text mt-6'>We designed an innovative cryptography mechanism that proves game
            results are random and safe against manipulation.</p>
          <FollowLink
            href='/'
            label='How it works'
            className='font-semibold text-base mx-auto md:mt-14 mt-8'
          />
        </div>
        <div>
          <Image
            height='0'
            width='0'
            sizes='100vw'
            src='/images/immutable.png'
            className='w-full max-w-[454px] h-auto md:ml-auto md:mr-0 mx-auto'
            alt='dumont'
          />
        </div>
      </div>

      <div className='grid md:grid-cols-2 grid-cols-1 items-center xl:gap-0 lg:gap-4 gap-14 md:py-48 py-16'>
        <div className='md:order-1 order-2'>
          <Image
            height='0'
            width='0'
            sizes='100vw'
            src='/images/Permissionless.png'
            className='w-full max-w-[400px] h-auto md:mx-0 mx-auto'
            alt='dumont'
          />
        </div>
        <div className='md:order-2 order-1'>
          <GradiantBadge icon='circle-dollar' label='immediate payouts' className='w-fit' />
          <h3 className='title mt-6'>Permissionless payouts</h3>
          <div className='mt-2 md:text-2xl text-lg text-neutral-300'>No need for operator permission</div>
          <p className='description-text mt-6'>
            Your winning amounts are immediately and automatically sent to your address by the blockchain-based smart
            contract.
          </p>
          <BlurBadge className='mt-6'><b>$10,230,000</b> bet settled so far</BlurBadge>
        </div>
      </div>
    </>
  );
};

export default FeaturesSection;
