import Link from 'next/link';
import Image from 'next/image';

import Routes from '@/constants/routes';

import Menus from './Menus';
import ConnectWallet from './ConnectWallet';
import ResponsiveMenu from './ResponsiveMenu';

export interface Menu {
  label: string;
  href: string;
}

const menus: Menu[] = [
  { label: 'Activity', href: Routes.ACTIVITY },
  { label: 'Tutorial', href: Routes.TUTORIAL },
];

const Header = () => {
  return (
    <div className="flex-between">
      <div className="flex-center-v gap-8">
        <Link href={Routes.HOME}>
          <Image width={32} height={28} src="./images/logo.svg" alt="dumont" />
        </Link>

        <Menus menuItems={menus} />
      </div>

      <ConnectWallet />

      <ResponsiveMenu menuItems={menus} />
    </div>
  );
};

export default Header;
