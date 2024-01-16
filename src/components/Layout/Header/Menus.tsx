import Link from 'next/link';
import clsx from 'clsx';

import { Menu } from '.';

interface Props {
  className?: string;
  menuItems: Menu[];
}

const Menus = ({ menuItems, className }: Props) => {
  return (
    <ul className={clsx('md:flex hidden items-center gap-8', className)}>
      {menuItems.map((menu, index) => (
        <li
          key={index}
          className="font-medium text-neutral-200 hover:text-primary-250 text-sm transition ease-in-out"
        >
          <Link href={menu.href}>{menu.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Menus;
