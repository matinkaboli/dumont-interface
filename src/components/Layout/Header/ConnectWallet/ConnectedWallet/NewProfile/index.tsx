import Image from 'next/image';
import { useDisconnect } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';

import { Button, Icon } from '@/components';
import links from '@/constants/links';
import useAxiosGet from '@/hooks/useAxiosGet';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import truncateString from '@/helpers/truncateString';

import BalanceList from '../Profile/BalanceList';
import CopyBox from '../Profile/CopyBox';

interface ReferralData {
  id: number;
}

const NewProfile = ({ onOpenChange }: { onOpenChange: () => void }) => {
  const { address } = useTypedSelector((state) => state.account.profile);
  const { data: referralData } = useAxiosGet<ReferralData>(`players/${address}/referrals`);
  const { disconnectAsync } = useDisconnect();
  const { logout } = usePrivy();

  const referralLink = referralData ? `${links.APP}/i/${referralData?.id}` : '';

  const onDisconnect = async () => {
    try {
      await disconnectAsync();
      await logout();
      onOpenChange();
    } catch (error) {}
  };

  return (
    <>
      <h6 className="text-white text-center text-base font-semibold -mt-[18px]">Profile</h6>

      <CopyBox
        className="w-full mt-8"
        copyText={address || ''}
        copyLabel={truncateString(address || '', { leftChars: 6, rightChars: 4 })}
        copyIcon={<Image src="/images/account.svg" width={24} height={24} alt="account" />}
      />

      <div className="flex gap-4 mt-8">
        <Button fullWidth radius="lg" leftSection={<Icon name="arrow-up" />}>
          Send
        </Button>
        <Button fullWidth variant="secondary" radius="lg" leftSection={<Icon name="arrow-down" />}>
          Receive
        </Button>
      </div>

      <div className="flex flex-col gap-2 mt-6">
        <h6 className="text-sm text-neutral-300 font-semibold">Balance</h6>
        <BalanceList />
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
    </>
  );
};

export default NewProfile;
