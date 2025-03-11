import clsx from 'clsx';

import TeamChart from './TeamChart';
import BetForm from './BetForm';
import Match from './Match';

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

const teams = [
  { name: 'homeTeam', label: 'Real Madrid' },
  { name: 'draw', label: 'Draw' },
  { name: 'awayTeam', label: 'Barcelona' },
];

export const homeTeam = {
  name: 'Barcelona',
  shortName: 'FCB',
  logo: '/images/teams/barcelona.svg',
};

export const awayTeam = {
  name: 'Real Madrid',
  shortName: 'RMD',
  logo: '/images/teams/real-madrid.svg',
};

const LEAGUE = {
  name: 'Spain- LaLiga',
  logo: '',
};

const darkLayoutStyle = 'bg-secondary-900 border-[1.5px] border-neutral-700 rounded-lg';

const Detail = () => {
  return (
    <>
      <Match
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        league={LEAGUE}
        matchTime="23 Aug - 23:30"
        className={clsx(darkLayoutStyle, 'p-4')}
      />
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-4">
        <TeamChart
          className={clsx(darkLayoutStyle, 'col-span-2 px-6 py-5')}
          teams={teams}
          data={sampleData}
        />
        <BetForm />
      </div>
    </>
  );
};

export default Detail;
