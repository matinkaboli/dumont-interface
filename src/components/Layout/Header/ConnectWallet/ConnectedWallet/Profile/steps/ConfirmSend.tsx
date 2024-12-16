import Image from 'next/image';

import { Button, Icon } from '@/components';
import truncateString from '@/helpers/truncateString';
import { DEFAULT_ADDRESS } from '@/constants/static';

const ConfirmSend = () => {
  return (
    <div>
      <div className="bg-neutral-600 rounded-xl p-4 mt-8">
        <div className="flex gap-2 bg-neutral-700 rounded-xl px-4 py-2.5 font-bold text-xl text-white w-fit mx-auto">
          <Image width={24} height={24} src="/images/tokens/eth.svg" alt="" />
          120
        </div>

        <Icon name="arrow-down" color="#ADADB6" className="mx-auto my-4" />

        <div className="flex gap-2 bg-neutral-700 rounded-xl px-4 py-2.5 font-medium text-md text-white w-fit mx-auto">
          <Image src="/images/account.svg" width={24} height={24} alt="account" />
          {truncateString(DEFAULT_ADDRESS, { leftChars: 8, rightChars: 8 })}
        </div>
      </div>

      <div className="flex-between px-4 py-2 mt-3 text-base text-neutral-300 font-medium bg-neutral-600 rounded-xl">
        <div>Fee</div>
        <div>$0.3</div>
      </div>
      <Button type="submit" fullWidth className="mt-6" radius="lg">
        Confirm
      </Button>
    </div>
  );
};

export default ConfirmSend;
