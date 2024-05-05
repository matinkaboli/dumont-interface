import Image from 'next/image';
import clsx from 'clsx';

import { FadeInUp } from '@/components';

import PlayButton from '../PlayButton';

const CTASection = ({ className }: { className?: string }) => {
  return (
    <div className={clsx('pt-40 md:pb-60 pb-32 text-center', className)}>
      <FadeInUp className='w-fit mt-4 mx-auto'>
        <Image width='80' height='80' src='/images/gradiant-square-logo.svg' alt='dumont' />
      </FadeInUp>
      <FadeInUp
        tag='h4'
        className='md:text-6xl text-4xl text-white font-bold sm:whitespace-normal whitespace-nowrap mt-4'>
        Respect Your Luck
      </FadeInUp>
      <FadeInUp>
        <p className='md:text-md text-base text-neutral-200 mt-4'>
          Experience true randomness at play
        </p>
        <PlayButton className='mt-8 flex justify-center' />
      </FadeInUp>
    </div>
  );
};

export default CTASection;
