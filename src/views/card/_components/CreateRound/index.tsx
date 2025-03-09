import { usePrivy } from '@privy-io/react-auth';
import clsx from 'clsx';

import { Button } from '@/components';
import { useNewRound } from '@/hooks/useNewRound';

import DemoCard from './DemoCard';

interface Props {
  className?: string;
  title?: string;
  desc?: string;
}

const CreateRound = ({
  className = '',
  title = 'Start the game',
  desc = 'To begin the game, you need to create a round',
}: Props) => {
  const { onCreateRound, isCreateGameLoading } = useNewRound();
  const { ready } = usePrivy();

  return (
    <div
      className={clsx(
        'relative bg-neutral-800 border-[1.5px] border-neutral-700 rounded-lg md:px-8 px-1.5 pt-8 text-center overflow-hidden',
        className,
      )}
    >
      <div className="relative z-10">
        <h1 className="text-2xl text-white font-bold">{title}</h1>
        <p className="text-sm text-neutral-200 mt-1">{desc}</p>

        <Button
          variant="primary"
          size="sm"
          radius="lg"
          onClick={onCreateRound}
          className="mt-4 mx-auto !font-bold md:w-auto w-full"
          disabled={isCreateGameLoading || !ready}
        >
          Create game
        </Button>

        <div className="flex justify-center items-end gap-4 mt-10 -mb-2">
          <DemoCard width={190} height={163} className="hidden md:block" />
          <DemoCard width={212} height={178} />
          <DemoCard width={190} height={163} className="hidden md:block" />
        </div>
      </div>

      <div className="bg-gradiant-box absolute inset-x-0 bottom-0 w-full md:h-[186px] h-full" />
    </div>
  );
};

export default CreateRound;
