import Image from 'next/image';
import dayjs from 'dayjs';

import { Match } from '@/types/match';

import ProgressBar from '@/views/sport/_components/ProgressBar';
import { PulsingCircle } from '@/components';

interface Props {
  match: Match;
  className?: string;
}

const Match = ({ match, className }: Props) => {
  const { homeTeam, awayTeam, latestOdds, start, league, isEnded, isBettingClosed, isPrematch, score } = match;

  return (
    <div className={className}>
      <div className='flex gap-1 items-center text-xs text-center text-neutral-400 w-fit mx-auto'>
        <Image width={0} height={0} className='h-5 w-auto' sizes='100vw' src={league.logo} alt={league.name} />
        {league.name}
        {!isPrematch && !isEnded && (
          <>
            <div className='bg-neutral-600 block h-3 w-[1px] mx-2' />
            <PulsingCircle size='sm' className='mr-0.5' />
            <div>34:22</div>
          </>
        )}
      </div>

      <h1 className='flex items-center mt-2 whitespace-nowrap w-fit mx-auto'>
        <span className='inline-flex items-center md:text-md text-sm text-white font-bold md:gap-3 gap-1.5'>
          {homeTeam.name}
          <Image width={0} height={0} className='h-8 w-auto' sizes='100vw' src={homeTeam.logo} alt={homeTeam.logo} />
        </span>

        {!isPrematch ?
          (<div className='font-bold text-xl text-neutral-100 mx-12'>{score.replace(':', ' - ')}</div>) :
          (
            <span className='inline-flex flex-col gap-0.5 md:px-11 px-2'>
              <span className='text-center text-xs text-neutral-400'>Match time</span>
              <span className='text-center text-sm text-neutral-100 font-medium'>
                {dayjs(start).format('DD MMM - HH:mm')}
              </span>
            </span>
          )
        }

        <span className='inline-flex items-center md:text-md text-sm text-white font-bold md:gap-3 gap-1.5'>
          <Image width={0} height={0} className='h-8 w-auto' sizes='100vw' src={awayTeam.logo} alt={awayTeam.name} />
          {awayTeam.name}
        </span>
      </h1>

      {isEnded ?
        (<div className='bg-primary-800 text-white w-fit px-6 py-1.5 font-bold text-base mx-auto mt-6 rounded-full'>
          The match has ended
        </div>) :
        latestOdds && (
          <div className='max-w-[541px] flex gap-1.5 w-full mx-auto mt-6'>
            <ProgressBar
              name={homeTeam.shortName}
              percentage={latestOdds.home}
              bgColor='white'
              roundedFull
              labelClassName='text-center'
            />
            <ProgressBar name='DRAW' percentage={latestOdds.draw} roundedFull labelClassName='text-center' />
            <ProgressBar
              name={awayTeam.shortName}
              percentage={latestOdds.away}
              roundedFull
              labelClassName='text-center'
            />
          </div>)
      }
    </div>
  );
};

export default Match;
