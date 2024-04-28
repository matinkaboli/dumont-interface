import Image from 'next/image';
import clsx from 'clsx';

import {FadeInUp} from '@/components';

import PlayButton from '../PlayButton';

const CTASection = ({ className }: { className?: string }) => {
  return (
    <div className={clsx('pt-40 md:pb-60 pb-32', className)}>
      <div className='flex flex-col items-center gap-4 text-center'>
        <FadeInUp className="w-fit"><Image width='80' height='80' src='/images/gradiant-square-logo.svg' alt='dumont' /></FadeInUp>
        <FadeInUp tag="h4" className='md:text-6xl text-4xl text-white font-bold sm:whitespace-normal whitespace-nowrap'>
          Respect Your Luck
        </FadeInUp>
        <FadeInUp tag="p" className='md:text-md text-base text-neutral-200'>
          Experience true randomness at play
        </FadeInUp>
      </div>
      <FadeInUp>
        <PlayButton className='mt-8 mx-auto' />
      </FadeInUp>
    </div>
  );
};

export default CTASection;
