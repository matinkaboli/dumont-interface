import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

import { Icon } from '@/components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  dir: 'left' | 'right';
}

const NavButton = ({ type = 'button', className, dir, ...props }: Props) => {
  return (
    <button
      {...props}
      type={type}
      className={clsx(
        'min-w-[40px] w-10 h-10 rounded-full md:flex hidden items-center justify-center hover:bg-neutral-700 border border-neutral-700 disabled:bg-neutral-700 [&_.path]:disabled:fill-neutral-550',
        className,
      )}
    >
      <Icon name={`angle-${dir}`} color="#F2F2F2" />
    </button>
  );
};

export default NavButton;
