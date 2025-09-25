'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Loading } from '@/components';
import { AppDispatch } from '@/redux/store';
import { getMatches } from '@/redux/features/match/matchSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import isEmpty from '@/helpers/isEmpty';

import Match from './Match';
import LiveToggleButton from './LiveToggleButton';

const GameBoard = () => {
  const [isLive, setIsLive] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { isConnecting } = useTypedSelector((state) => state.account.profile);
  const { matches, loading, isRefetching } = useTypedSelector((state) => state.match.main);

  useEffect(() => {
    dispatch(getMatches({ live: isLive }));

    const interval = setInterval(() => {
      dispatch(getMatches({ live: isLive }));
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const onToggleLive = () => setIsLive(!isLive);

  if ((loading && !isRefetching) || isConnecting) {
    return (
      <div className='min-h-[50vh] flex-center'>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className='flex-between'>
        <h1 className='sm:text-2xl text-xl font-bold text-white'>Game Board</h1>
        <LiveToggleButton isLive={isLive} onToggle={onToggleLive} />
      </div>

      {isEmpty(matches) ?
        (<div className='text-white text-center mx-auto py-20'>
          There is no match.
        </div>) :
        (<div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-3 sm:mt-8 mt-6'>
          {matches?.map((match) => (
            <Match key={match.matchId} match={match} />
          ))}
        </div>)
      }
    </>
  );
};

export default GameBoard;
