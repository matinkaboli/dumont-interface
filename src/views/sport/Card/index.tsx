import Image from 'next/image';

import { Icon, PulsingCircle } from '@/components';

import ProgressBar from './ProgressBar';

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
  isActive: boolean;
  matchTime: string;
}

const Card = ({ isActive, league, homeTeam, awayTeam, matchTime }: Props) => {
  return (
    <div className="relative border-[1.5px] border-neutral-700 bg-neutral-800 rounded-lg w-full sm:pt-4 sm:pb-6 sm:px-2 p-3 cursor-pointer">
      {isActive && <PulsingCircle size="sm" className="absolute top-2 left-2" />}
      <div className="text-center text-xs text-neutral-400">Match time</div>
      <div className="text-center text-sm text-neutral-100 mt-0.5">{matchTime}</div>

      <h6 className="flex items-center text-base text-white font-bold mt-3 whitespace-nowrap w-fit mx-auto">
        <span className="inline-flex items-center gap-2">
          {homeTeam.name}
          <Image width={0} height={0} className="h-6 w-auto" src={homeTeam.logo} alt="" />
        </span>
        <span className="px-2">-</span>
        <span className="inline-flex items-center gap-2">
          <Image width={0} height={0} className="h-6 w-auto" src={awayTeam.logo} alt="" />
          {awayTeam.name}
        </span>
      </h6>

      <div className="flex gap-1 items-center text-xs text-center text-neutral-400 w-fit mx-auto mt-3">
        <Icon name="ball" width="12" height="12" />
        {league.name}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <ProgressBar name={homeTeam.shortName} percentage={56} bgColor="white" />
        <ProgressBar name="DRAW" percentage={10} />
        <ProgressBar name={awayTeam.shortName} percentage={34} />
      </div>
    </div>
  );
};

export default Card;
