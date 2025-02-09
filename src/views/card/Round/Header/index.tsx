import timeLeftInSeconds from '@/helpers/timeLeftInSeconds';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import ProgressbarTimer from './ProgressbarTimer';
import Tutorial from './Tutorial';
import NewGame from './NewGame';
import isEmpty from '@/helpers/isEmpty';

const Header = () => {
  const { data: game, areAllCardsGuessed, isRefetching } = useTypedSelector((state) => state.game);

  return (
    <div className="flex justify-between items-center text-white">
      <div className="flex items-center gap-2">
        <h1 className="font-bold text-2xl">Card Game</h1>
        {!isEmpty(game) && !areAllCardsGuessed && (
          <div key={isRefetching ? 'refetch' : 'fetch'} className="w-28">
            <ProgressbarTimer
              duration={+game!.duration}
              initialTime={+game!.duration - timeLeftInSeconds(game!.createdAt)}
            />
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <Tutorial />
        <NewGame />
      </div>
    </div>
  );
};

export default Header;
