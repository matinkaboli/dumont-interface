'use client'

import { memo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { NavigationItem } from '@/constants/nav';

import { generateNavColor, renderIcon } from './index';

interface Props {
  item: NavigationItem;
  isActive: boolean;
  index: number;
}

const DesktopNavItem = memo(({ item, isActive, index }: Props) => {
  const baseItemStyles = 'min-h-[72px] w-[60px] border-transparent rounded-md';
  const activeStyles =
    isActive && !item.disabled && index !== 0
      ? 'border bg-gradiant-border bg-primary-800 bg-origin-border'
      : '';
  const disabledStyles = item.disabled ? 'pointer-events-none' : '';

  const baseLinkStyles =
    'min-h-[72px] flex flex-col items-center justify-center gap-1 bg-neutral-800 rounded-md text-sm p-3 transition duration-200';

  return (
    <div className={clsx(baseItemStyles, activeStyles, disabledStyles)}>
      <Link
        href={item.link}
        className={clsx(baseLinkStyles, index !== 0 && 'hover:bg-neutral-750')}
      >
        {renderIcon(item.icon, isActive, item.disabled)}
        <span className={generateNavColor(isActive, item.disabled)}>{item.label}</span>
        {item.disabled && (
          <span className="text-sm text-neutral-200 px-3 py-0.5 block rounded-xl border-[1.5px] border-neutral-700">
            Soon
          </span>
        )}
      </Link>
    </div>
  );
});

DesktopNavItem.displayName = 'DesktopNavItem';
export default DesktopNavItem;
