'use client';

import clsx from 'clsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import { AppDispatch } from '@/redux/store';
import { getMatch } from '@/redux/features/match/matchSlice';
import { Loading } from '@/components';
import isEmpty from '@/helpers/isEmpty';

import BetForm from '@/views/sport/Detail/BetForm';

import TeamChart from './TeamChart';
import Match from './Match';
import ActivityTab from './ActivityTab';

const createTimestamp = (minutes: number, startDate?: Date) => {
  if (!startDate) startDate = new Date(2024, 0, 1, 0, 0, 0);

  const newDate = new Date(startDate);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return newDate.getTime();
};

const sampleData = [
  { time: createTimestamp(0), homeTeam: 47, draw: 38, awayTeam: 42 },
  { time: createTimestamp(5), homeTeam: 47.5, draw: 41, awayTeam: 41 },
  { time: createTimestamp(10), homeTeam: 48, draw: 45, awayTeam: 40 },
  { time: createTimestamp(15), homeTeam: 50, draw: 48, awayTeam: 44 },
  { time: createTimestamp(20), homeTeam: 53, draw: 52, awayTeam: 48 },
  { time: createTimestamp(25), homeTeam: 52.5, draw: 52, awayTeam: 48 },
  { time: createTimestamp(30), homeTeam: 52, draw: 52, awayTeam: 48 },
  { time: createTimestamp(35), homeTeam: 52, draw: 52, awayTeam: 48 },
  { time: createTimestamp(40), homeTeam: 52, draw: 52, awayTeam: 48 },
  { time: createTimestamp(45), homeTeam: 50, draw: 52, awayTeam: 48 },
  { time: createTimestamp(50), homeTeam: 48, draw: 52, awayTeam: 48 },
  { time: createTimestamp(55), homeTeam: 51, draw: 51, awayTeam: 47 },
  { time: createTimestamp(60), homeTeam: 54, draw: 50, awayTeam: 46 },
  { time: createTimestamp(65), homeTeam: 54, draw: 50, awayTeam: 46 },
  { time: createTimestamp(70), homeTeam: 54, draw: 50, awayTeam: 46 },
  { time: createTimestamp(75), homeTeam: 54.5, draw: 50, awayTeam: 46 },
  { time: createTimestamp(80), homeTeam: 55, draw: 50, awayTeam: 46 },
  { time: createTimestamp(85), homeTeam: 55, draw: 50, awayTeam: 51 },
  { time: createTimestamp(90), homeTeam: 55, draw: 50, awayTeam: 56 },
];

const darkLayoutStyle = 'bg-secondary-900 border-[1.5px] border-neutral-700 rounded-lg';

const Detail = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ id: string; }>();
  const { isConnecting } = useTypedSelector((state) => state.account.profile);
  const { match, loading } = useTypedSelector((state) => state.match.main);

  const teams = [
    { name: 'homeTeam', label: match ? match.homeTeam.name : '' },
    { name: 'draw', label: 'Draw' },
    { name: 'awayTeam', label: match ? match.awayTeam.name : '' },
  ];

  useEffect(() => {
    dispatch(getMatch(params.id));
  }, [params]);

  if (loading || isConnecting) {
    return (
      <div className='min-h-[50vh] flex-center'>
        <Loading />
      </div>
    );
  }

  if (isEmpty(match)) {
    return (
      <div className='text-white text-center mx-auto py-20'>
        There is no match with this id
      </div>
    );
  }

  return (
    <>
      <Match match={match!} className={clsx(darkLayoutStyle, 'md:p-4 px-2 py-4')} />
      <div className='grid md:grid-cols-3 grid-cols-1 gap-4 mt-4'>
        <TeamChart
          className={clsx(darkLayoutStyle, 'col-span-2 md:px-6 pl-2 pr-0 md:py-5 py-4')}
          teams={teams}
          data={sampleData}
        />
        <BetForm matchId={params.id} />
      </div>

      <ActivityTab className='md:mt-16 mt-6' />
    </>
  );
};

export default Detail;
