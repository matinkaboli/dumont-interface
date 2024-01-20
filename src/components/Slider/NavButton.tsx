import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

const NavButton = ({
  type = 'button',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      type={type}
      style={{ minWidth: '40px' }}
      className={clsx('w-10 h-10 rounded-full flex-center border border-neutral-600', className)}
    />
  );
};

export default NavButton;
