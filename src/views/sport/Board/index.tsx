'use client';

import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Loading } from '@/components';
import { AppDispatch } from '@/redux/store';
import { getLiveMatches, getRecordedMatches } from '@/redux/features/match/matchSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import isEmpty from '@/helpers/isEmpty';

import Match from './Match';
import LiveToggleButton from './LiveToggleButton';

const POLLING_INTERVAL = 5000;

const GameBoard = () => {
  const [isLive, setIsLive] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { isConnecting } = useTypedSelector((state) => state.account.profile);
  const { matches, recordedMatches, loading, isRefetching } = useTypedSelector((state) => state.match.main);

  const fetchMatches = async () => {
    await dispatch(getRecordedMatches());
    await dispatch(getLiveMatches());
  };

  useEffect(() => {
    fetchMatches();

    intervalRef.current = setInterval(() => fetchMatches(), POLLING_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const onToggleLive = () => setIsLive((prev) => !prev);

  const matchesToRender = isLive ? matches : recordedMatches;
  const isInitialLoading = (loading && !isRefetching) || isConnecting;
  const showMatches = !isEmpty(matchesToRender);

  if (isInitialLoading) {
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

      {showMatches ?
        (<div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-3 sm:mt-8 mt-6'>
          {matchesToRender?.map((match) => (
            <Match key={match.matchId} match={match} />
          ))}
        </div>) :
        (<div className='text-white text-center mx-auto py-20'>
          There is no match.
        </div>)
      }
    </>
  );
};

export default GameBoard;
