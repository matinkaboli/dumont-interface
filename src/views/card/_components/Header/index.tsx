import clsx from 'clsx';

import timeLeftInSeconds from '@/helpers/timeLeftInSeconds';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import isEmpty from '@/helpers/isEmpty';

import ProgressbarTimer from './ProgressbarTimer';
import Tutorial from './Tutorial';
import NewGame from './NewGame';
import { FARO_DURATION } from '@/constants/static';

const Header = ({ showTitleInMobile = true }: { showTitleInMobile?: boolean }) => {
  const { data: game, areAllCardsGuessed, isRefetching } = useTypedSelector((state) => state.game);

  return (
    <div className="flex justify-between items-center text-white gap-1">
      <div className="flex items-center sm:gap-2 gap-1">
        <h1
          className={clsx(
            'font-bold md:text-2xl sm:text-xl whitespace-nowrap',
            showTitleInMobile ? 'inline-block' : 'sm:inline-block hidden',
          )}
        >
          Card Game
        </h1>
        {!isEmpty(game) && !areAllCardsGuessed && (
          <div key={isRefetching ? 'refetch' : 'fetch'}>
            <ProgressbarTimer
              duration={FARO_DURATION}
              initialTime={FARO_DURATION - timeLeftInSeconds(game!.createdAt)}
            />
          </div>
        )}
      </div>
      <div className="flex sm:gap-3 gap-1">
        <Tutorial />
        <NewGame />
      </div>
    </div>
  );
};

export default Header;
