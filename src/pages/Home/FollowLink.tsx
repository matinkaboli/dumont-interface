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
    <Link href={href} className={clsx('flex items-center gap-2 text-primary-250', className)}>
      {label}
      <Icon name='arrow-right' />
    </Link>
  );
};

export default FollowLink;
