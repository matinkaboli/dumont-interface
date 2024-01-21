import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

import { Icon } from '@/components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  dir: 'left' | 'right'
}

const NavButton = ({
  type = 'button',
  className,
  dir,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      type={type}
      style={{ minWidth: '40px' }}
      className={clsx('w-10 h-10 rounded-full md:flex hidden items-center justify-center border border-neutral-600', className)}
    >
      <Icon name={`angle-${dir}`} color='#DBDBE2' />
    </button>
  );
};

export default NavButton;
