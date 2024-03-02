import clsx from 'clsx';

import KeyLayout from './KeyLayout';

interface Props {
  className?: string;
}

const RevealKey = ({ className }: Props) => {
  return (
    <KeyLayout
      className={clsx('col-span-2', className)}
      buttonClassName="text-md text-white font-bold"
    >
      Reveal {`->`}
    </KeyLayout>
  );
};

export default RevealKey;
