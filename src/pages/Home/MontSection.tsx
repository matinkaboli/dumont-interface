import Image from 'next/image';

import FoldedCorners from './_components/FoldedCorners';

const MontSection = () => {
  return (
    <div className='px-4'>
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
          <Image width={104} height={104} src='/images/mont.svg' alt='mont' />
          <h3 className='title'>$MONT</h3>
          <h6 className='md:text-3xl text-xl text-white font-bold'>Democratizing the house benefit</h6>
        </div>
      </div>
    </div>
  );
};

export default MontSection;
