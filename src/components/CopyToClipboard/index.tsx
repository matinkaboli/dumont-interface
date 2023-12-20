'use client';

import { useState } from 'react';
import copy from 'copy-to-clipboard';

import { Icon } from '@/components';

interface Props {
  copyText: string;
  buttonText?: string;
  className?: string;
}

const CopyToClipboard = ({ copyText, buttonText, className }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopyText = () => {
    copy(copyText);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button type="button" className={className} onClick={onCopyText}>
      {isCopied ? 'Copied!' : buttonText || <Icon name="copy" />}
    </button>
  );
};

export default CopyToClipboard;
