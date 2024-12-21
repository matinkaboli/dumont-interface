import { Dispatch, SetStateAction } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useDisconnect } from 'wagmi';
import Image from 'next/image';

import { Button, Icon } from '@/components';
import truncateString from '@/helpers/truncateString';
import useAxiosGet from '@/hooks/useAxiosGet';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import links from '@/constants/links';

import CopyBox from '../CopyBox';
import BalanceList from '../BalanceList';
import { Balance } from '../../Profile';

interface Props {
  onCloseDialog: () => void;
  onNextSlide: () => void;
  setProcess: Dispatch<SetStateAction<'send' | 'receive'>>;
  accountBalance: Balance;
}

const ProfileDetail = ({ accountBalance, onCloseDialog, onNextSlide, setProcess }: Props) => {
  const { address } = useTypedSelector((state) => state.account.profile);
  const { data: referralData } = useAxiosGet<{ id: number }>(`players/${address}/referrals`);
  const referralLink = referralData ? `${links.APP}/i/${referralData?.id}` : '';
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
        className="w-full mt-8"
        copyText={address || ''}
        copyLabel={truncateString(address || '', { leftChars: 6, rightChars: 4 })}
        copyIcon={<Image src="/images/account.svg" width={24} height={24} alt="account" />}
      />

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

      <div className="flex flex-col gap-2 mt-6">
        <h6 className="text-sm text-neutral-300 font-semibold">Balance</h6>
        <BalanceList accountBalance={accountBalance} />
      </div>

      <div className="flex flex-col gap-2 mt-10">
        <h6 className="text-sm text-neutral-300 font-semibold">Invite Link</h6>
        <CopyBox copyText={referralLink} copyLabel={referralLink} copyIcon={<Icon name="link" />} />
      </div>
      <Button
        fullWidth
        variant="link"
        radius="lg"
        className="text-error-400 font-semibold text-base mt-8 mx-auto !px-0 hover:bg-neutral-600"
        leftSection={<Icon name="arrow-right-from-bracket" />}
        onClick={onDisconnect}
      >
        Disconnect
      </Button>
    </div>
  );
};

export default ProfileDetail;
