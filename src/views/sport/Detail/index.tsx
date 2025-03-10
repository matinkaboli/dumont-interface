'use client';

import clsx from 'clsx';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
} from '@/components';

import TeamChart from './TeamChart';
import Match from './Match';
import Image from 'next/image';

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

const homeTeam = {
  name: 'Barcelona',
  shortName: 'FCB',
  logo: '/images/teams/barcelona.svg',
};

const awayTeam = {
  name: 'Real Madrid',
  shortName: 'RMD',
  logo: '/images/teams/real-madrid.svg',
};

const LEAGUE = {
  name: 'Spain- LaLiga',
  logo: '',
};

const Detail = () => {
  const teams = [
    { name: 'homeTeam', label: 'Real Madrid' },
    { name: 'draw', label: 'Draw' },
    { name: 'awayTeam', label: 'Barcelona' },
  ];

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
        <div className="bg-primary-900 bordr-[1.5px] border-primary-700 rounded-lg col-span-1 p-4">
          <Select defaultValue="option1">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="option1">
                  <div className="flex items-center gap-1">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-6 w-auto"
                      src={homeTeam.logo}
                      alt=""
                    />
                    {homeTeam.name}
                    <div className="text-xs text-white font-bold bg-primary-700 rounded-full py-0.5 px-1.5">
                      $0.43
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="option2">
                  <div className="flex items-center gap-1">
                    <span className="block w-4 h-0.5 bg-neutral-200" />
                    Draw
                    <div className="text-xs text-white font-bold bg-primary-700 rounded-full py-0.5 px-1.5">
                      $0.22
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="option3">
                  <div className="flex items-center gap-1">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-6 w-auto"
                      src={awayTeam.logo}
                      alt=""
                    />
                    {awayTeam.name}
                    <div className="text-xs text-white font-bold bg-primary-700 rounded-full py-0.5 px-1.5">
                      $0.35
                    </div>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Slider className="mt-4" defaultValue={[2]} max={30} step={1} />
        </div>
      </div>
    </>
  );
};

export default Detail;
