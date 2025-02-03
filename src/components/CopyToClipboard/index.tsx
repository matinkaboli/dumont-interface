'use client';

import { ReactNode, useState } from 'react';
import copy from 'copy-to-clipboard';
import clsx from 'clsx';

import { Icon } from '@/components';

import CopiedTooltip from './CopiedTooltip';

interface Props {
  copyText: string;
  copyLabel?: string;
  className?: string;
  children?: ReactNode;
  showIcon?: boolean;
  checkIconColor?: string;
}

const CopyToClipboard = ({
  copyText,
  showIcon = true,
  copyLabel,
  children,
  className,
  checkIconColor,
}: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopyText = () => {
    copy(copyText);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <>
      {showIcon ? (
        <button
          type="button"
          className={clsx('flex items-center gap-1 group', className)}
          onClick={onCopyText}
        >
          {children || copyLabel}
          <CopiedTooltip isCopied={isCopied}>
            <div>
              <Icon
                name={isCopied ? 'check' : 'copy'}
                color={isCopied ? checkIconColor || '#ADADB6' : '#ADADB6'}
                className="transition ease-in-out group-hover:[&_.path]:fill-primary-250"
              />
            </div>
          </CopiedTooltip>
        </button>
      ) : (
        <CopiedTooltip isCopied={isCopied}>
          <button type="button" className={className} onClick={onCopyText}>
            {children || copyLabel}
          </button>
        </CopiedTooltip>
      )}
    </>
  );
};

export default CopyToClipboard;
