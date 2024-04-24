import Image from 'next/image';
import clsx from 'clsx';

import PlayButton from '../PlayButton';

const CTASection = ({ className }: { className?: string }) => {
  return (
    <div className={clsx('pt-40 md:pb-60 pb-32', className)}>
      <div className='flex flex-col items-center gap-4 text-center'>
        <Image width='80' height='80' src='/images/gradiant-square-logo.svg' alt='dumont' />
        <h4 className='md:text-6xl text-4xl text-white font-bold sm:whitespace-normal whitespace-nowrap'>Respect Your
          Luck</h4>
        <p className='md:text-md text-base text-neutral-200'>Experience true randomness at play</p>
      </div>
      <PlayButton className='mt-8 mx-auto' />
    </div>
  );
};

export default CTASection;
