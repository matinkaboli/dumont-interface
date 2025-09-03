import Link from 'next/link';

import { FOOTER_ITEMS } from '@/constants/nav';
import { IconName } from '@/components/Icon/iconConfig';
import { Icon } from '@/components';

const MoreInfo = () => {
  return (
    <div className="flex-col gap-2">
      {FOOTER_ITEMS.map((item) => (
        <Link
          key={item.id}
          href={item.link}
          target="_blank"
          className="w-full py-6 first:pt-0 block flex-between border-b border-neutral-600 last:border-transparent"
        >
          <span className="flex items-center gap-1.5 text-white text-base">
            <Icon name={item.icon as IconName} color="#ADADB6" width="17" height="17" />
            {item.label}
          </span>
          <span>
            <Icon name="arrow-up-right" color="#fff" />
          </span>
        </Link>
      ))}
    </div>
  );
};

export default MoreInfo;
