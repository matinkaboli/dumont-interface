'use client';

import { useState } from 'react';
import copy from 'copy-to-clipboard';

import { Icon, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components';

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
    <TooltipProvider delayDuration={100}>
      <Tooltip open={isCopied}>
        <TooltipTrigger className="group" asChild>
          <button type="button" className={className} onClick={onCopyText}>
            {buttonText || <Icon name="copy" className="transition ease-in-out group-hover:[&_.path]:fill-primary-250" />}
          </button>
        </TooltipTrigger>
        <TooltipContent>Copied!</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyToClipboard;
