import Image from 'next/image';

import { Icon } from '@/components';

import ProgressBar from '@/views/sport/_components/ProgressBar';

interface ILeague {
  name: string;
  logo: string;
}

interface ITeam {
  name: string;
  logo: string;
  shortName: string;
}

interface Props {
  league: ILeague;
  homeTeam: ITeam;
  awayTeam: ITeam;
  matchTime: string;
  className?: string;
}

const Match = ({ homeTeam, awayTeam, matchTime, league, className }: Props) => {
  return (
    <div className={className}>
      <div className="flex gap-1 items-center text-xs text-center text-neutral-400 w-fit mx-auto">
        <Icon name="ball" width="12" height="12" />
        {league.name}
      </div>

      <h1 className="flex items-center mt-2 whitespace-nowrap w-fit mx-auto">
        <span className="inline-flex items-center md:text-md text-sm text-white font-bold md:gap-3 gap-1.5">
          {homeTeam.name}
          <Image width={0} height={0} className="h-8 w-auto" src={homeTeam.logo} alt="" />
        </span>

        <span className="inline-flex flex-col gap-0.5 md:px-11 px-2">
          <span className="text-center text-xs text-neutral-400">Match time</span>
          <span className="text-center text-sm text-neutral-100 font-medium">{matchTime}</span>
        </span>

        <span className="inline-flex items-center md:text-md text-sm text-white font-bold md:gap-3 gap-1.5">
          <Image width={0} height={0} className="h-8 w-auto" src={awayTeam.logo} alt="" />
          {awayTeam.name}
        </span>
      </h1>

      <div className="max-w-[541px] flex gap-1.5 w-full mx-auto mt-6">
        <ProgressBar
          name={homeTeam.shortName}
          percentage={43}
          bgColor="white"
          roundedFull
          labelClassName="text-center"
        />
        <ProgressBar name="DRAW" percentage={22} roundedFull labelClassName="text-center" />
        <ProgressBar
          name={awayTeam.shortName}
          percentage={35}
          roundedFull
          labelClassName="text-center"
        />
      </div>
    </div>
  );
};

export default Match;
