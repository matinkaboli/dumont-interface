import { ReactNode } from 'react';
import clsx from 'clsx';

import { CopyToClipboard } from '@/components';

interface Props {
  copyText: string;
  copyLabel?: string;
  copyIcon?: ReactNode;
  className?: string;
}

const parentClassName =
  'bg-neutral-600 px-4 h-10 rounded-lg border border-neutral-600 hover:border-primary-200 transition ease-in-out';

const CopyBox = ({ copyText, copyLabel, copyIcon, className }: Props) => {
  return (
    <CopyToClipboard copyText={copyText} className={clsx(parentClassName, className)}>
      <span className="flex gap-2">
        {copyIcon}
        <span className="text-neutral-100 font-medium text-base">{copyLabel}</span>
      </span>
    </CopyToClipboard>
  );
};

export default CopyBox;
