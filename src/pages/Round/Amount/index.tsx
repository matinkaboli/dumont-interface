import { Button, Icon, Input } from '@/components';
import Image from 'next/image';

import AmountInfo from './Info';

const inputProps = {
  size: 'sm' as any,
  placeholder: 'Enter amount',
  rightSection: <Image src="/images/USDT.svg" width={24} height={24} alt="" />,
};

const mobileInputProps = {
  size: 'md' as any,
  placeholder: 'Enter amount',
  className: '!bg-neutral-700 !border-neutral-700 !text-white !font-bold',
  rightSection: (
    <div className="flex gap-1.5 items-center">
      <Image src="/images/USDT.svg" width={32} height={32} alt="" />
      <span className="text-base font-medium">USDT</span>
    </div>
  ),
};

const Amount = () => {
  return (
    <>
      {/* Desktop View */}
      <div className="md:block hidden bg-gradiant-border-amount bg-origin-border border border-transparent rounded-lg w-full h-full">
        <div className="flex flex-col justify-between bg-primary-800 px-4 py-6 rounded-lg w-full h-full">
          <div>
            <Input {...inputProps} />

            {/*info section*/}
            <AmountInfo odd={6.6} total={220} className="gap-3 mt-4" />
          </div>

          <Button fullWidth size="md" radius="lg" className="!font-semibold">
            Connect Wallet
          </Button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-2">
        <div className="flex items-end gap-2">
          <div className="grow">
            <Input {...mobileInputProps} />
          </div>
          <div className="flex-none">
            <button type="button" className="bg-neutral-700 h-12 w-12 rounded-lg">
              <Icon name="angle-down" color="white" width="28" height="28" className="mx-auto" />
            </button>
          </div>
        </div>

        {/*info section*/}
        <AmountInfo
          odd={6.6}
          total={220}
          className="bg-neutral-700 rounded-lg px-4 py-1 gap-2"
          labelClassName="text-neutral-400"
          valueClassName="text-neutral-200"
        />

        <Button fullWidth size="lg" radius="lg" className="!font-semibold absolute right-0 left-0 -bottom-8">
          Connect Wallet
        </Button>
      </div>
    </>
  );
};

export default Amount;
