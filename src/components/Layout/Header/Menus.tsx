'use client';

import clsx from 'clsx';

import { useNewRound } from '@/hooks/useNewRound';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import Tutorial from './Tutorial';

const menuClassNames =
  'font-medium text-neutral-200 hover:text-primary-250 text-sm transition ease-in-out';

const Menus = ({ className }: { className?: string }) => {
  const { onCreateRound } = useNewRound();
  const { isConnected } = useTypedSelector((state) => state.account.profile);

  return (
    <ul className={clsx('md:flex hidden items-center gap-8', className)}>
      <li className={menuClassNames}>
        <Tutorial />
      </li>
      {isConnected && (
        <li className={menuClassNames}>
          <button type="button" onClick={onCreateRound}>
            New Round
          </button>
        </li>
      )}
    </ul>
  );
};

export default Menus;
