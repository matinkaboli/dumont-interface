import Image from 'next/image';

import './styles.css';


const RotatingCoin = () => {
  return (
    <div className='h-[104px] relative'>
      <div className='coin'>
        <div className='coin-side'>
          <Image
            className='coin-image'
            width={104}
            height={104}
            src='/images/mont.svg'
            alt='mont'
          />
        </div>
        <div className='coin-side coin-tails'>
          <Image
            className='coin-image'
            width={104}
            height={104}
            src='/images/mont.svg'
            alt='mont'
          />
        </div>
      </div>
    </div>
  );
};

export default RotatingCoin;
