'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon } from '@/components';
import { IconName } from '@/components/Icon/iconConfig';
import Routes from '@/constants/routes';
import { FOOTER_ITEMS, IconType, NAVIGATION_ITEMS, NavigationItem } from '@/constants/nav';

import DesktopNavItem from './DesktopNavItem';
import MobileNavItem from './MobileNavItem';

const INACTIVE_ICON_COLOR = '#ADADB6';
const ACTIVE_ICON_COLOR = '#fff';
const NEUTRAL_COLOR = 'text-neutral-400';
const WHITE_COLOR = 'text-white';

const moreItem: NavigationItem = {
  id: 'more',
  label: 'More',
  link: Routes.MORE_INFO,
  targetLink: Routes.MORE_INFO,
  icon: {
    type: 'icon',
    name: 'ellipsis-vertical',
  },
  disabled: false,
};

export const renderIcon = (icon: IconType, isActive?: boolean, disabled?: boolean) => {
  const iconColor = !isActive || disabled ? INACTIVE_ICON_COLOR : ACTIVE_ICON_COLOR;

  if (icon.type === 'image') {
    return <Image width={icon.width} height={icon.height} src={icon.src} alt={icon.alt} />;
  }

  return <Icon name={icon.name as IconName} color={iconColor} />;
};

export const generateNavColor = (isActive: boolean, disabled: boolean) => {
  return !isActive || disabled ? NEUTRAL_COLOR : WHITE_COLOR;
};

const SideNavs = () => {
  const pathname = usePathname();

  const isLinkActive = (targetLink: string) => pathname === targetLink || pathname.startsWith(targetLink);

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className='md:flex hidden flex-col justify-between items-center gap-0.5 px-2.5 pb-6 border-x-[1.5px] border-neutral-750 bg-secondary-900 md:min-h-screen min-h-auto'>
        <div>
          {NAVIGATION_ITEMS.map((item, index) => (
            <DesktopNavItem
              key={item.id}
              index={index}
              item={item}
              isActive={isLinkActive(item.targetLink)}
            />
          ))}
        </div>
        <div className='flex-col gap-2'>
          {FOOTER_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              target='_blank'
              className='w-12 h-12 block flex-center group'
            >
              <Icon
                name={item.icon as IconName}
                color={isLinkActive(item.link) ? '#C319C3' : '#ADADB6'}
                className='group-hover:[&>path]:fill-primary-400 transition ease-in-out'
              />
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className='md:hidden flex justify-between fixed inset-x-0 bottom-0 z-50 bg-gradiant-black px-8 py-2.5'>
        {NAVIGATION_ITEMS.map(
          (item) =>
            item.icon.type !== 'image' && (
              <MobileNavItem key={item.id} item={item} isActive={isLinkActive(item.targetLink)} />
            ),
        )}
        <MobileNavItem item={moreItem} isActive={pathname === moreItem.targetLink} />
      </nav>
    </>
  );
};

export default SideNavs;
