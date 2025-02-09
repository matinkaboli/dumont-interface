'use client';

import Image from 'next/image';

import { Icon } from '@/components';
import { IconName } from '@/components/Icon/iconConfig';
import { useActivePath } from '@/hooks/useActivePath';
import Routes from '@/constants/routes';

import DesktopNavItem from './DesktopNavItem';
import MobileNavItem from './MobileNavItem';

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

export type IconType = IconImage | IconComponent;

export interface NavigationItem {
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
      alt: 'dumont',
    },
    disabled: false,
  },
  {
    id: 'card',
    label: 'Card',
    link: '/',
    icon: {
      type: 'icon',
      name: 'game-card',
    },
    disabled: false,
  },
  {
    id: 'sport',
    label: 'Sport',
    link: Routes.START,
    icon: {
      type: 'icon',
      name: 'ball',
    },
    disabled: true,
  },
];

export const renderIcon = (icon: IconType) => {
  if (icon.type === 'image') {
    return <Image width={icon.width} height={icon.height} src={icon.src} alt={icon.alt} />;
  }

  return <Icon name={icon.name as IconName} />;
};

const SideNavs = () => {
  const isActivePath = useActivePath();

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="sm:flex hidden flex-col gap-0.5 px-2.5 border-x-[1.5px] border-neutral-750 bg-neutral-800 sm:min-h-screen min-h-auto">
        {NAVIGATION_ITEMS.map((item) => (
          <DesktopNavItem key={item.id} item={item} isActive={isActivePath(item.link)} />
        ))}
      </nav>

      {/* Mobile Navigation */}
      <nav className="sm:hidden flex justify-between fixed inset-x-0 bottom-0 z-40 bg-gradiant-black px-8 py-2.5">
        {NAVIGATION_ITEMS.map(
          (item) =>
            item.icon.type !== 'image' && (
              <MobileNavItem
                key={item.id}
                itemType="link"
                item={item}
                isActive={isActivePath(item.link)}
              />
            ),
        )}
        <MobileNavItem itemType="link" />
      </nav>
    </>
  );
};

export default SideNavs;
