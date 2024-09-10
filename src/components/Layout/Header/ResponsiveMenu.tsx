'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Icon } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { useScreenDetector } from '@/hooks/useScreenDetector';
import { useNewRound } from '@/hooks/useNewRound';

import Tutorial from './Tutorial';

const menuClassNames = 'text-white text-md';

const ResponsiveMenu = () => {
  const dispatch = useDispatch();
  const { address, isConnected } = useTypedSelector((state) => state.account.profile);
  const { isMobile } = useScreenDetector();
  const { onCreateRound } = useNewRound();

  useEffect(() => {
    if (!isMobile) {
      dispatch(closeDialog());
    }
  }, [isMobile]);

  const onOpenMenu = () => {
    dispatch(
      openDialog({
        content: (
          <ul className="flex flex-col gap-6">
            <li className={menuClassNames}>
              <Tutorial />
            </li>
            {isConnected &&
            <li className={menuClassNames}>
              <button type="button" onClick={onCreateRound}>
                New Round
              </button>
            </li>
            }
          </ul>
        ),
      }),
    );
  };

  if (!address) return null;

  return (
    <>
      <button type="button" className="md:hidden block" onClick={onOpenMenu}>
        <Icon name="ellipsis-vertical" />
      </button>
    </>
  );
};

export default ResponsiveMenu;
