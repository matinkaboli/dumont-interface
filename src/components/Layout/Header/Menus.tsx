'use client';

import clsx from 'clsx';

import { useNewRound } from '@/hooks/useNewRound';

import Tutorial from './Tutorial';

const menuClassNames =
  'font-medium text-neutral-200 hover:text-primary-250 text-sm transition ease-in-out';

const Menus = ({ className }: { className?: string }) => {
  const { onCreateRound } = useNewRound();

  return (
    <ul className={clsx('md:flex hidden items-center gap-8', className)}>
      <li className={menuClassNames}>
        <Tutorial />
      </li>
      <li className={menuClassNames}>
        <button type="button" onClick={onCreateRound}>
          New Round
        </button>
      </li>
    </ul>
  );
};

export default Menus;
