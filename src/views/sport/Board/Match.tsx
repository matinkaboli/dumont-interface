import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';

import { PulsingCircle } from '@/components';
import { Match } from '@/types/match';
import Routes from '@/constants/routes';
import ProgressBar from '@/views/sport/_components/ProgressBar';

const Match = ({ match }: {
  match: Match;
}) => {
  const { matchId, homeTeam, awayTeam, league, latestOdds, startTime, isPrematch, isEnded, score, timer } = match;
  const matchUrl = `${Routes.SPORTS}/${matchId}`;

  return (
    <Link
      href={matchUrl}
      className='relative border-[1.5px] border-neutral-700 bg-neutral-800 rounded-lg w-full sm:pt-4 sm:pb-6 sm:px-2 p-3 cursor-pointer'>
      <div className='text-center text-xs text-neutral-400'>Match time</div>
      {!isPrematch && !isEnded ?
        (
          <div className='flex-center mx-auto w-fit gap-1 mt-0.5'>
            <PulsingCircle size='sm' />
            <span className='text-neutral-100 text-xs'>{timer}</span>
          </div>
        ) : (
          <div className='text-neutral-100 text-xs text-center mt-0.5'>
            {dayjs(startTime).format('DD MMM - HH:mm')}
          </div>
        )
      }

      <h6 className='flex items-center text-sm text-white font-medium mt-3 whitespace-nowrap w-fit mx-auto'>
        <span className='inline-flex items-center gap-2'>
          {homeTeam.shortName}
          <Image width={0} height={0} className='h-6 w-auto' sizes='100vw' src={homeTeam.logo} alt={homeTeam.name} />
        </span>
        <span className='px-2 text-sm font-bold'>{score.replace(':', ' - ')}</span>
        <span className='inline-flex items-center gap-2'>
          <Image width={0} height={0} className='h-6 w-auto' sizes='100vw' src={awayTeam.logo} alt={awayTeam.name} />
          {awayTeam.shortName}
        </span>
      </h6>

      <div className='flex gap-1 items-center text-xs text-center text-neutral-400 w-fit mx-auto mt-3'>
        <Image src={league.logo} width={0} height={0} sizes='100vw' className='h-3 w-auto' alt={league.name} />
        {league.name}
      </div>

      <div className='mt-4 flex flex-col gap-3'>
        <ProgressBar name={homeTeam.shortName} percentage={latestOdds?.home ?? 0} bgColor='white' />
        <ProgressBar name='DRAW' percentage={latestOdds?.draw ?? 0} />
        <ProgressBar name={awayTeam.shortName} percentage={latestOdds?.away ?? 0} />
      </div>
    </Link>
  );
};

export default Match;
