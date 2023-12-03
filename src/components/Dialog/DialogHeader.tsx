import { HTMLAttributes } from 'react';

const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={'pb-6 px-8 -mx-8 border-b border-neutral-400'} {...props} />
);

export default DialogHeader;
