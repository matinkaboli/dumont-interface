import Link from 'next/link';
import Image from 'next/image';

import { Button, Icon, QRCode } from '@/components';
import truncateString from '@/helpers/truncateString';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import CopyBox from '../CopyBox';

const Receive = () => {
  const { address } = useTypedSelector((state) => state.account.profile);

  return (
    <div>
      <QRCode value={address || ''} size={192} className="mx-auto mt-8" />

      <CopyBox
        className="mx-auto mt-6"
        copyText={address || ''}
        copyLabel={truncateString(address || '', { leftChars: 8, rightChars: 8 })}
      />
      <div className="-mx-6">
        <Button
          asChild
          fullWidth
          radius="lg"
          variant="link"
          className="mt-14 -mb-8 h-14 !font-medium text-base text-white bg-neutral-600 flex justify-between"
        >
          <Link href="/" target="_blank">
            <span className="flex items-center gap-2">
              <Image width={44} height={28} src="/images/fiat.svg" alt="" />
              Buy crypto with fiat
            </span>
            <Icon name="arrow-up-right" color="#EA00FF" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Receive;
