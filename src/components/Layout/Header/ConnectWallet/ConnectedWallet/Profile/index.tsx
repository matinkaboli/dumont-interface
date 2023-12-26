import { Button, Icon, QRCode } from '@/components';
import Image from 'next/image';
import { useDisconnect } from 'wagmi';

import truncateString from '@/helpers/truncateString';
import { useTypedSelector } from '@/hooks/useTypesSelector';

import CopyBox from './CopyBox';
import BalanceList from './BalanceList';
import LinkButton from './LinkButton';

interface Props {
  onOpenChange: () => void;
}

const Profile = ({ onOpenChange }: Props) => {
  const address = useTypedSelector((state) => state.account.address) || '';
  const { disconnect } = useDisconnect({
    onSuccess() {
      onOpenChange();
    },
  });

  return (
    <>
      <QRCode value={address} size={192} className="mx-auto" />

      <div className="flex flex-col gap-6">
        <CopyBox
          className="mt-4"
          copyText={address}
          copyLabel={truncateString(address, { leftChars: 8, rightChars: 8 })}
          copyIcon={<Image src="/images/metamask.png" width={24} height={24} alt="MetaMask" />}
        />

        <div className="flex flex-col gap-2">
          <h6 className="text-sm text-neutral-300 font-semibold">Balance</h6>
          <BalanceList address={address} />

          <div className="flex gap-2">
            <LinkButton link="/">
              <Icon name="credit-card" />
              Buy crypto
            </LinkButton>

            <LinkButton link="/">
              <Icon name="swap-coin" />
              Bridge asset
            </LinkButton>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h6 className="text-sm text-neutral-300 font-semibold">Invite Link</h6>
          <CopyBox
            className="border border-neutral-500"
            copyText="https://dumm.io/2341"
            copyLabel="https://dumm.io/2341"
            copyIcon={<Icon name="link" />}
          />
        </div>
      </div>

      <Button
        variant="link"
        className="text-error-400 font-semibold text-base mt-8 mx-auto !px-0"
        rightSection={<Icon name="arrow-right-from-bracket" />}
        onClick={() => disconnect()}
      >
        Logout
      </Button>
    </>
  );
};

export default Profile;
