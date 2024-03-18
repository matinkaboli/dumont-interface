'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Icon } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { useScreenDetector } from '@/hooks/useScreenDetector';

import Tutorial from './Tutorial';
import { newRoundMenu } from '.';

const menuClassNames = 'text-white text-md';

const ResponsiveMenu = () => {
  const dispatch = useDispatch();
  const { address } = useTypedSelector((state) => state.account.profile);
  const { isMobile } = useScreenDetector();

  useEffect(() => {
    if (!isMobile) {
      dispatch(closeDialog());
    }
  }, [isMobile]);

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
