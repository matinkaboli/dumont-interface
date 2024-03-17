'use client';

import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { Icon } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { openDialog } from '@/redux/features/dialogSlice';

import Tutorial from './Tutorial';
import { newRoundMenu } from '.';

const menuClassNames = 'text-white text-md';

const ResponsiveMenu = () => {
  const dispatch = useDispatch();
  const { address } = useTypedSelector((state) => state.account.profile);

  const onOpenMenu = () =>
    dispatch(
      openDialog({
        content: (
          <ul className="flex flex-col gap-6">
            <li className={menuClassNames}>
              <Tutorial />
            </li>
            <li className={menuClassNames}>
              <Link href={newRoundMenu.href}>{newRoundMenu.label}</Link>
            </li>
          </ul>
        ),
      }),
    );

  if (!address) return null;

  return (
    <button type="button" className="md:hidden block" onClick={onOpenMenu}>
      <Icon name="ellipsis-vertical" />
    </button>
  );
};

export default ResponsiveMenu;
