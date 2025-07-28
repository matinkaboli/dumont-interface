'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Loading, PulsingCircle } from '@/components';
import { AppDispatch } from '@/redux/store';
import { getMatches } from '@/redux/features/match/matchSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import isEmpty from '@/helpers/isEmpty';

import Match from './Match';

const GameBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isConnecting } = useTypedSelector((state) => state.account.profile);
  const { matches, loading } = useTypedSelector((state) => state.match.main);

  useEffect(() => {
    dispatch(getMatches());
  }, []);

  if (loading || isConnecting) {
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
        <button
          type='button'
          className='h-7 px-3 bg-neutral-750 flex-center gap-1 font-medium text-sm text-white rounded-full'
        >
          <PulsingCircle size='sm' />
          Live
        </button>
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
