import Link from 'next/link';
import clsx from 'clsx';

import { Icon } from '@/components';

interface Props {
  href: string,
  label: string,
  className?: string
}

const FollowLink = ({ href, label, className }: Props) => {
  return (
    <Link href={href} target="_blank" className={clsx('flex items-center gap-2 text-primary-250 hover:text-primary-100 [&_.path]:hover:fill-primary-100 w-fit', className)}>
      {label}
      <Icon name='arrow-right' className="" />
    </Link>
  );
};

export default FollowLink;
