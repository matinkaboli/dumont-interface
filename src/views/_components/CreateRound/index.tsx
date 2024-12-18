import clsx from 'clsx';

import { Button } from '@/components';
import { useNewRound } from '@/hooks/useNewRound';
import { usePrivy } from '@privy-io/react-auth';

import DemoCard from './DemoCard';

interface Props {
  className?: string;
  title?: string;
  desc?: string;
}

const CreateRound = ({
  className = '',
  title = 'Let’s start your round',
  desc = 'To start the game, you need to create a round',
}: Props) => {
  const { onCreateRound, isCreateGameLoading, isApproveLoading } = useNewRound();
  const { ready } = usePrivy();

  return (
    <div
      className={clsx(
        'bg-gradiant-box rounded-lg md:px-8 px-1.5 pt-8 text-center card-deck-height',
        className,
      )}
    >
      <h1 className="text-2xl text-white font-bold">{title}</h1>
      <p className="text-sm text-neutral-200 mt-1">{desc}</p>

      <Button
        variant="primary"
        size="sm"
        radius="lg"
        onClick={onCreateRound}
        className="mt-4 mx-auto !font-bold md:w-auto w-full"
        disabled={isCreateGameLoading || isApproveLoading || !ready}
      >
        Create Round
      </Button>

      <div className="flex justify-center items-end gap-4 mt-10">
        <DemoCard width={190} height={163} className="hidden md:block" />
        <DemoCard width={212} height={178} />
        <DemoCard width={190} height={163} className="hidden md:block" />
      </div>
    </div>
  );
};

export default CreateRound;
