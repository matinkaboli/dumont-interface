import timeLeftInSeconds from '@/helpers/timeLeftInSeconds';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import ProgressbarTimer from './ProgressbarTimer';
import Tutorial from './Tutorial';
import NewGame from './NewGame';
import isEmpty from '@/helpers/isEmpty';

const Header = () => {
  const { data: game, areAllCardsGuessed, isRefetching } = useTypedSelector((state) => state.game);

  return (
    <div className="flex justify-between items-center text-white gap-1">
      <div className="flex items-center sm:gap-2 gap-1">
        <h1 className="font-bold md:text-2xl sm:text-xl whitespace-nowrap">Card Game</h1>
        {!isEmpty(game) && !areAllCardsGuessed && (
          <div key={isRefetching ? 'refetch' : 'fetch'}>
            <ProgressbarTimer
              duration={+game!.duration}
              initialTime={+game!.duration - timeLeftInSeconds(game!.createdAt)}
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
