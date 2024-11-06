import Image from 'next/image';
import { useDisconnect } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';

import { Button, Icon, QRCode } from '@/components';
import truncateString from '@/helpers/truncateString';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import useAxiosGet from '@/hooks/useAxiosGet';
import links from '@/constants/links';

import CopyBox from './CopyBox';
import BalanceList from './BalanceList';
import LinkButton from './LinkButton';

interface ReferralData {
  id: number;
}

const Profile = ({ onOpenChange }: { onOpenChange: () => void }) => {
  const { address } = useTypedSelector((state) => state.account.profile);
  const { data: referralData } = useAxiosGet<ReferralData>(`players/${address}/referrals`);
  const { logout } = usePrivy();
  const { disconnectAsync } = useDisconnect();


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
      <QRCode value={address || ''} size={192} className="mx-auto" />

      <div className="flex flex-col gap-6 mt-4">
        <CopyBox
          copyText={address || ''}
          copyLabel={truncateString(address || '', { leftChars: 6, rightChars: 4 })}
          copyIcon={<Image src="/images/metamask.png" width={24} height={24} alt="MetaMask" />}
        />

        <div className="flex flex-col gap-2">
          <h6 className="text-sm text-neutral-300 font-semibold">Balance</h6>
          <BalanceList />

          <div className="flex gap-2">
            <LinkButton link={links.BUY_CRYPTO}>
              <Icon name="credit-card" />
              Buy crypto
            </LinkButton>

            <LinkButton link={links.BRIDGE_ASSET}>
              <Icon name="swap-coin" />
              Bridge asset
            </LinkButton>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h6 className="text-sm text-neutral-300 font-semibold">Invite Link</h6>
          <CopyBox
            copyText={referralLink}
            copyLabel={referralLink}
            copyIcon={<Icon name="link" />}
          />
        </div>
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

export default Profile;
