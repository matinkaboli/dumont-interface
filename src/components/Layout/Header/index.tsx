import Link from 'next/link';
import Image from 'next/image';
import Menus from './Menus';
import ConnectWallet from './ConnectWallet';

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-8 items-center">
        <Link href="/">
          <Image width={32} height={28} src="./images/logo.svg" alt="dumont" />
        </Link>

        <Menus />
      </div>

      <ConnectWallet />
    </div>
  );
};

export default Header;
