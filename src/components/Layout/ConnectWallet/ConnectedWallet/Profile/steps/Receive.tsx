import Link from 'next/link';
import Image from 'next/image';

import { Button, Icon, QRCode } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import truncateString from '@/helpers/truncateString';
import links from '@/constants/links';

import CopyBox from '../CopyBox';

const Receive = () => {
  const { address } = useTypedSelector((state) => state.account.profile);

  return (
    <div>
      <QRCode value={address || ''} size={192} className='mx-auto mt-8' />

      <div className='flex flex-col mt-6 !px-6 w-fit mx-auto'>
        <CopyBox
          className='flex-center rounded-t-xl border border-neutral-550 hover:!border-primary-400'
          copyText={address || ''}
          copyLabel={truncateString(address || '', { leftChars: 7, rightChars: 7 })}
        />

        <div
          className='flex items-center gap-1 bg-neutral-750 border border-t-0 border-neutral-600 py-3 px-6 font-medium text-sm text-neutral-300 rounded-b-xl'>
          <span>Send only in</span>
          <Image width={16} height={16} src='/images/tokens/usdc.svg' alt='' />
          <span className='font-medium text-sm text-white'>USDC</span>
          <span>on</span>
          <Image
            height={0}
            width={0}
            className='h-3 w-auto'
            src='/images/base-logo.svg'
            alt=''
          />
        </div>
      </div>

      <div className='-mx-6'>
        <Button
          asChild
          fullWidth
          radius='lg'
          variant='link'
          className='mt-14 -mb-8 h-14 !font-medium text-base text-white bg-neutral-700 flex justify-between'
        >
          <Link href={links.MOONPAY} target='_blank'>
            <span className='flex items-center gap-2'>
              <Image width={44} height={28} src='/images/fiat.svg' alt='' />
              Buy crypto with fiat
            </span>
            <Icon name='arrow-up-right' color='#EA00FF' />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Receive;
