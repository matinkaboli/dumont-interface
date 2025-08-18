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
  'bg-neutral-700 px-4 py-3 border-[1.5px] border-neutral-700 hover:border-primary-400 transition ease-in-out';

const CopyBox = ({ copyText, copyLabel, copyIcon, className }: Props) => {
  return (
    <CopyToClipboard checkIconColor="#CD3FCD" copyText={copyText} className={clsx(parentClassName, className)}>
      <span className="flex items-center gap-2">
        {copyIcon}
        <span className="text-neutral-100 font-medium text-base whitespace-nowrap">{copyLabel}</span>
      </span>
    </CopyToClipboard>
  );
};

export default CopyBox;
