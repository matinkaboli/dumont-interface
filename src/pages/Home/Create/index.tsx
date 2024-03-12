import clsx from 'clsx';

import DemoCard from './DemoCard';
import ConfirmRound from './ConfirmRound';

const CreateRound = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={clsx(
        'bg-gradiant-box rounded-lg md:px-8 px-1.5 pt-8 text-center card-deck-height',
        className,
      )}
    >
      <h1 className="text-2xl text-white font-bold">Let’s start your round</h1>
      <p className="text-sm text-neutral-200 mt-1">To start the game, you need to create a round</p>

      <ConfirmRound />

      <div className="flex justify-center items-end gap-4 mt-10">
        <DemoCard width={190} height={163} className="hidden md:block" />
        <DemoCard width={212} height={178} />
        <DemoCard width={190} height={163} className="hidden md:block" />
      </div>
    </div>
  );
};

export default CreateRound;
