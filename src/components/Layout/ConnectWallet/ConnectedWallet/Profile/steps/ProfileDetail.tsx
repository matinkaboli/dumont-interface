import { Dispatch, SetStateAction } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useDisconnect } from 'wagmi';
import Image from 'next/image';

import { Button, Icon } from '@/components';
import truncateString from '@/helpers/truncateString';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import humanizeAmount from '@/helpers/humanizeAmount';

import CopyBox from '../CopyBox';
import { Balance } from '../index';

interface Props {
  onCloseDialog: () => void;
  onNextSlide: () => void;
  setProcess: Dispatch<SetStateAction<'send' | 'receive'>>;
  accountBalance: Balance;
}

const ProfileDetail = ({ accountBalance, onCloseDialog, onNextSlide, setProcess }: Props) => {
  const { address } = useTypedSelector((state) => state.account.profile);
  const { disconnectAsync } = useDisconnect();
  const { logout } = usePrivy();

  const onDisconnect = async () => {
    try {
      await disconnectAsync();
      await logout();
      onCloseDialog();
    } catch (error) {}
  };

  const onSend = () => {
    setProcess('send');
    onNextSlide();
  };

  const onReceive = () => {
    setProcess('receive');
    onNextSlide();
  };

  return (
    <div>
      <CopyBox
        className="rounded-xl w-full mt-8 justify-between"
        copyText={address || ''}
        copyLabel={truncateString(address || '', { leftChars: 6, rightChars: 4 })}
        copyIcon={<Image src="/images/account.svg" width={32} height={32} alt="account" />}
      />

      <div className="mt-2 bg-neutral-700 rounded-xl px-4 py-6 border-b-[1.5px] border-neutral-750 last:border-b-0">
        <div className="flex-between">
          <div className='flex items-center gap-2'>
            <Image width={32} height={32} src="/images/tokens/usdc.svg" alt='' />
            <div className="flex flex-col gap-0">
              <span className="text-white text-base font-medium">USDC</span>
              <span className="text-neutral-400 text-xs">USDC</span>
            </div>
          </div>
          <div className='text-neutral-200 text-base font-medium'>
            ${humanizeAmount(accountBalance.usdc ?? '0')}
          </div>
        </div>


        <div className="flex gap-4 mt-8">
          <Button fullWidth radius="lg" leftSection={<Icon name="arrow-up" />} onClick={onSend}>
            Send
          </Button>
          <Button
            fullWidth
            variant="secondary"
            radius="lg"
            leftSection={<Icon name="arrow-down" />}
            onClick={onReceive}
          >
            Receive
          </Button>
        </div>
      </div>

      <Button
        fullWidth
        variant="link"
        radius="lg"
        className="text-error-400 font-semibold text-base mt-6 mx-auto !px-0 hover:bg-neutral-600"
        leftSection={<Icon name="arrow-right-from-bracket" />}
        onClick={onDisconnect}
      >
        Disconnect
      </Button>
    </div>
  );
};

export default ProfileDetail;
