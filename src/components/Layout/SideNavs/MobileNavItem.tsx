import { memo } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import { NavigationItem } from '@/constants/nav';

import { generateNavColor, renderIcon } from './index';

interface Props {
  item: NavigationItem;
  isActive: boolean;
}

const className = 'text-sm font-medium flex flex-col justify-between items-center gap-1';

const MobileNavItem =  memo(({ item, isActive = false }: Props) => {
  return (
    <Link
      href={item!.link}
      className={clsx(
        className,
        generateNavColor(isActive, item.disabled),
        item.disabled && 'pointer-events-none',
      )}
    >
      {renderIcon(item.icon, isActive, item.disabled)}
      {item!.label}
    </Link>
  );
});

MobileNavItem.displayName = 'MobileNavItem'

export default MobileNavItem;
