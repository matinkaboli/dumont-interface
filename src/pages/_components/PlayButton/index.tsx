import clsx from 'clsx';

import { Button, Icon } from '@/components';


const PlayButton = ({ className = '' }: { className?: string }) => {
  return (
    <Button
      size='md'
      radius='lg'
      rightSection={<Icon name='angle-right' />}
      className={clsx('font-semibold', className)}>
      Start playing
    </Button>
  );
};

export default PlayButton;
