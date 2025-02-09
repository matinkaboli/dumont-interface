import { memo } from 'react';
import Link from 'next/link';

import { NavigationItem, renderIcon } from './index';

interface Props {
  item: NavigationItem;
  isActive: boolean;
}

const DesktopNavItem = memo(({ item, isActive }: Props) => {
  const baseItemStyles = 'min-h-[72px] w-[60px] border-transparent rounded-md';
  const activeStyles =
    isActive && !item.disabled ? 'border bg-gradiant-border bg-primary-800 bg-origin-border' : '';
  const disabledStyles = item.disabled ? 'pointer-events-none' : '';

  const baseLinkStyles =
    'min-h-[72px] flex flex-col items-center justify-center gap-1 bg-neutral-800 text-neutral-400 rounded-md text-sm p-3 transition duration-200 hover:bg-neutral-750';

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

DesktopNavItem.displayName = 'DesktopNavItem';
export default DesktopNavItem;
