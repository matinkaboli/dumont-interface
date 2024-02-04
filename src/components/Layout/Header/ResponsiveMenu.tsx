'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Icon } from '@/components';
import ModalSheet from '@/components/ModalSheet';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { Menu } from '.';

interface Props {
  menuItems: Menu[];
}

const ResponsiveMenu = ({ menuItems }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const address = useTypedSelector((state) => state.account.address);
  const onToggleMenu = () => setOpen((prev) => !prev);

  if (!address) return null;

  return (
    <div className="md:hidden block">
      <button onClick={onToggleMenu}>
        <Icon name="ellipsis-vertical" />
      </button>
      <ModalSheet isOpen={isOpen} onClose={onToggleMenu}>
        <ul className="flex flex-col gap-6">
          {menuItems.map((menu) => (
            <li key={menu.label} className="text-white text-md">
              <Link href={menu.href}>{menu.label}</Link>
            </li>
          ))}
          <li className="text-white text-md">
            <Link href="/">New Round</Link>
          </li>
        </ul>
      </ModalSheet>
    </div>
  );
};

export default ResponsiveMenu;
