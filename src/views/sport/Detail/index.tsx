'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import { AppDispatch } from '@/redux/store';
import { getMatch } from '@/redux/features/match/matchSlice';
import { Loading } from '@/components';
import isEmpty from '@/helpers/isEmpty';
import { getOdds } from '@/redux/features/match/oddsSlice';
import { Odds } from '@/types/match';

import TeamChart from './TeamChart';
import Match from './Match';
import ActivityTab from './ActivityTab';

const darkLayoutStyle = 'bg-secondary-900 border-[1.5px] border-neutral-700 rounded-lg';

const Detail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formattedOdds, setFormattedOdds] = useState<[]>([]);
  const { id } = useParams<{ id: string }>();
  const { isConnecting } = useTypedSelector((state) => state.account.profile);
  const { match, loading: matchLoading } = useTypedSelector((state) => state.match.main);
  const { loading: oddsLoading } = useTypedSelector((state) => state.match.odds);

  const teams = [
    { name: 'homeTeam', label: match?.homeTeam.name || '' },
    { name: 'draw', label: 'Draw' },
    { name: 'awayTeam', label: match?.awayTeam.name || '' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const matchRes = await dispatch(getMatch(id));
      if (!matchRes?.payload) return;

      // const start = Math.floor((+new Date(matchRes.createdAt)) / 1000).toString();
      // const end = Math.floor(Date.now() / 1000).toString();
      const oddsRes = await dispatch(getOdds({
        id: '5',
        start: '1753693000',
        end: '1753699000',
      }));

      if (oddsRes?.payload) {
        const formatted = oddsRes.payload.map((odds: Odds) => ({
          time: odds.date,
          homeTeam: odds.home,
          awayTeam: odds.away,
          draw: odds.draw,
        }));
        setFormattedOdds(formatted);
      }
    };

    fetchData();
  }, [dispatch, id]);

  if (isConnecting || matchLoading || oddsLoading) {
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
        {formattedOdds.length > 0 &&
          <TeamChart
            className={clsx(darkLayoutStyle, 'col-span-2 md:px-6 pl-2 pr-0 md:py-5 py-4')}
            teams={teams}
            data={formattedOdds}
          />
        }
        {/*<BetForm matchId={params.id} />*/}
      </div>

      <ActivityTab className='md:mt-16 mt-6' />
    </>
  );
};

export default Detail;
