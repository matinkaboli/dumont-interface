import { Button } from '@/components';

import ConnectedWallet from './ConnectedWallet';
import GiftButton from './GiftButton';

interface Props {
  isConnected: boolean;
}

const ConnectWallet = ({ isConnected }: Props) => {
  return (
    <div>
      {isConnected ? (
        <div className="flex gap-2">
          <GiftButton />
          <ConnectedWallet />
        </div>
      ) : (
        <Button variant="primary" size="sm" className="!text-primary-250 !bg-primary-500">
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default ConnectWallet;
