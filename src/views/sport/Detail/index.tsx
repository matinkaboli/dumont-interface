import TeamChart from './TeamChart';

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

const Detail = () => {
  const teams = [
    { name: 'homeTeam', label: 'Real Madrid' },
    { name: 'draw', label: 'Draw' },
    { name: 'awayTeam', label: 'Barcelona' },
  ];

  return <TeamChart teams={teams} data={sampleData} />;
};

export default Detail;
