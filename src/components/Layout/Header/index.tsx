import Link from 'next/link';
import Image from 'next/image';

import Routes from '@/constants/routes';

import Menus from './Menus';
import ConnectWallet from './ConnectWallet';
import ResponsiveMenu from './ResponsiveMenu';

export const newRoundMenu = { label: 'New round', href: Routes.CREATE_ROUND };

const Header = () => {
  return (
    <div className="flex-between">
      <div className="flex-center-v gap-8">
        <Link href={Routes.HOME}>
          <Image width={32} height={28} src="./images/logo.svg" alt="dumont" />
        </Link>

        <Menus />
      </div>

      <div className="min-h-[40px]">
        <ConnectWallet />
      </div>

      <ResponsiveMenu />
    </div>
  );
};

export default Header;
