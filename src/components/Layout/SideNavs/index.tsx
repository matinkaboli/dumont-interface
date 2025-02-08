'use client';

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Icon } from '@/components';
import Routes from '@/constants/routes';
import { useActivePath } from '@/hooks/useActivePath';

interface IconImage {
  type: 'image';
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface IconComponent {
  type: 'icon';
  name: string;
}

type IconType = IconImage | IconComponent;

interface NavigationItem {
  id: string;
  label: string;
  link: string;
  icon: IconType;
  disabled: boolean;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'home',
    label: '',
    link: Routes.HOME,
    icon: {
      type: 'image',
      src: '/images/logo.svg',
      width: 32,
      height: 28,
      alt: 'dumont'
    },
    disabled: false,
  },
  {
    id: 'card',
    label: 'Card',
    link: '/',
    icon: {
      type: 'icon',
      name: 'game-card'
    },
    disabled: false,
  },
  {
    id: 'sport',
    label: 'Sport',
    link: Routes.START,
    icon: {
      type: 'icon',
      name: 'ball'
    },
    disabled: true,
  },
];

interface NavItemProps {
  item: NavigationItem;
  isActive: boolean;
}

const NavItem = memo(({ item, isActive }: NavItemProps) => {
  const baseItemStyles = "min-h-[72px] w-[60px] border-transparent rounded-md";
  const activeStyles = isActive && !item.disabled ? "border bg-gradiant-border bg-primary-800 bg-origin-border" : "";
  const disabledStyles = item.disabled ? "pointer-events-none" : "";

  const baseLinkStyles = "min-h-[72px] flex flex-col items-center justify-center gap-1 bg-neutral-800 text-neutral-400 rounded-md text-sm p-3 transition duration-200 hover:bg-neutral-750";

  const renderIcon = (icon: IconType) => {
    if (icon.type === 'image') {
      return (
        <Image
          width={icon.width}
          height={icon.height}
          src={icon.src}
          alt={icon.alt}
        />
      );
    }
    // @ts-ignore
    return <Icon name={icon.name} />;
  };

  return (
    <div className={`${baseItemStyles} ${activeStyles} ${disabledStyles}`}>
      <Link href={item.link} className={baseLinkStyles}>
        {renderIcon(item.icon)}
        <span>{item.label}</span>
        {item.disabled && (
          <span className="text-sm text-neutral-200 px-3 py-0.5 block rounded-xl border-[1.5px] border-neutral-700">
            Soon
          </span>
        )}
      </Link>
    </div>
  );
});

NavItem.displayName = 'NavItem';

const SideNavs = () => {
  const isActivePath = useActivePath();

  return (
    <nav className="flex flex-col gap-0.5 px-2.5 border-x-[1.5px] border-neutral-750 bg-neutral-800 min-h-screen">
      {NAVIGATION_ITEMS.map((item) => (
        <NavItem
          key={item.id}
          item={item}
          isActive={isActivePath(item.link)}
        />
      ))}
    </nav>
  );
};

export default SideNavs;
