import { HTMLAttributes } from 'react';

const DialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={'pt-6 px-8 -mx-8 border-t border-neutral-400'} {...props} />
);

export default DialogFooter;
