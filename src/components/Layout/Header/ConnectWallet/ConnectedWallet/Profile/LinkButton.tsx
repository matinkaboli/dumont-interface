import { ReactNode } from 'react';
import Link from 'next/link';

import { Button } from '@/components';

interface Props {
  children: ReactNode;
  link: string;
}

const LinkButton = ({ children, link }: Props) => {
  return (
    <Button
      asChild
      fullWidth
      variant="link"
      size="sm"
      radius="lg"
      className="bg-neutral-600 hover:bg-primary-400 font-bold text-white"
    >
      <Link href={link} target="_blank">
        {children}
      </Link>
    </Button>
  );
};

export default LinkButton;
