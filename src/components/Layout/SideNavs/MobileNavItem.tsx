import clsx from 'clsx';
import Link from 'next/link';

import { Icon } from '@/components';

import { generateNavColor, NavigationItem, renderIcon } from './index';

interface Props {
  item?: NavigationItem;
  isActive?: boolean;
  itemType: 'link' | 'button';
}

const className = 'text-sm font-medium flex flex-col justify-between items-center gap-1';

const MobileNavItem = ({ item, itemType, isActive = false }: Props) => {
  if (item && itemType === 'link')
    return (
      <Link
        href={item!.link}
        className={clsx(className, generateNavColor(isActive, item.disabled))}
      >
        {renderIcon(item.icon, isActive, item.disabled)}
        {item!.label}
      </Link>
    );

  return (
    <button type="button" className={clsx('text-neutral-400', className)}>
      <Icon name="ellipsis-vertical" color="#ADADB6" />
      More
    </button>
  );
};

export default MobileNavItem;
