import Link from 'next/link';
import clsx from 'clsx';

import Tutorial from './Tutorial';
import { newRoundMenu } from '.';

const menuClassNames =
  'font-medium text-neutral-200 hover:text-primary-250 text-sm transition ease-in-out';

const Menus = ({ className }: { className?: string }) => {
  return (
    <ul className={clsx('md:flex hidden items-center gap-8', className)}>
      <li className={menuClassNames}>
        <Tutorial />
      </li>
      <li className={menuClassNames}>
        <Link href={newRoundMenu.href}>{newRoundMenu.label}</Link>
      </li>
    </ul>
  );
};

export default Menus;
