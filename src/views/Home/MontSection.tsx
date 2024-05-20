import Image from 'next/image';

import { Typography, FadeInUp } from '@/components';

import FoldedCorners from './_components/FoldedCorners';
import RotatingCoin from './_components/RotatingCoin';

const MontSection = () => {
  return (
    <FadeInUp className='px-4'>
      <div className='bg-gradiant-neon-pink relative pt-8 pb-14 px-4'>
        <Image
          width='0'
          height='0'
          sizes='100vw'
          src='/images/lines.png'
          className='w-auto h-full absolute right-0 top-0 bottom-0 md:block hidden'
          alt=''
        />
        <FoldedCorners />

        <div className='flex flex-col items-center text-center gap-4'>
          <RotatingCoin />
          <Typography tag='h3' variant='title1'>$MONT</Typography>
          <Typography tag='h6' variant='title4'>Democratizing the house benefit</Typography>
        </div>
      </div>
    </FadeInUp>
  );
};

export default MontSection;
