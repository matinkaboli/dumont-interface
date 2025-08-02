import Image from 'next/image';

import truncateString from '@/helpers/truncateString';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import humanizeAmount from '@/helpers/humanizeAmount';
import formatDecimal from '@/helpers/formatDecimal';

const AddressButton = ({ onOpenChange }: { onOpenChange: () => void }) => {
  const { address } = useTypedSelector((state) => state.account.profile);
  const balance = useTypedSelector((state) => state.account.balance);

  const formattedBalance = balance ? humanizeAmount(formatDecimal({ amount: Number(balance), decimalPlaces: 3 })) : 0;
  const renderBalance = (
    <>
      <Image width={20} height={20} src='/images/USDC.png' alt='USDC' />
      <span className='font-bold'>{formattedBalance}</span>
    </>
  );

  return (
    <>
      {/* Desktop Button */}
      <div className='border-primary-gradiant rounded-lg sm:inline-block hidden'>
        <button
          type='button'
          className='flex-center-v gap-2 pl-1 pr-3 h-10 bg-primary-800 rounded-lg'
          onClick={onOpenChange}
        >
          <div className='flex-center-v gap-1 max-w-fit text-white text-sm bg-primary-900 px-1 h-8 rounded-md'>
            {renderBalance}
            <span className='sm:inline-block hidden'>USDC</span>
          </div>
          <div className='text-primary-400 text-sm'>
            {truncateString(address || '', { leftChars: 6, rightChars: 4 })}
          </div>
        </button>
      </div>

      {/* Mobile Button */}
      <button
        type='button'
        className='sm:hidden inline-block flex-center-v text-white text-sm gap-1 bg-primary-800 rounded-lg px-2 py-2.5'
        onClick={onOpenChange}>
        {renderBalance}
        <span>USDC</span>
      </button>
    </>
  );
};

export default AddressButton;
