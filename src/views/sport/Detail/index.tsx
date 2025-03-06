import TeamChart from './TeamChart';

const createTimestamp = (minutes: number, startDate?: Date) => {
  if (!startDate) startDate = new Date(2024, 0, 1, 0, 0, 0);

  const newDate = new Date(startDate);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return newDate.getTime();
};

const sampleData = [
  { time: createTimestamp(0), realMadrid: 47, draw: 38, barcelona: 42 },
  { time: createTimestamp(5), realMadrid: 47.5, draw: 41, barcelona: 41 },
  { time: createTimestamp(10), realMadrid: 48, draw: 45, barcelona: 40 },
  { time: createTimestamp(15), realMadrid: 50, draw: 48, barcelona: 44 },
  { time: createTimestamp(20), realMadrid: 53, draw: 52, barcelona: 48 },
  { time: createTimestamp(25), realMadrid: 52.5, draw: 52, barcelona: 48 },
  { time: createTimestamp(30), realMadrid: 52, draw: 52, barcelona: 48 },
  { time: createTimestamp(35), realMadrid: 52, draw: 52, barcelona: 48 },
  { time: createTimestamp(40), realMadrid: 52, draw: 52, barcelona: 48 },
  { time: createTimestamp(45), realMadrid: 50, draw: 52, barcelona: 48 },
  { time: createTimestamp(50), realMadrid: 48, draw: 52, barcelona: 48 },
  { time: createTimestamp(55), realMadrid: 51, draw: 51, barcelona: 47 },
  { time: createTimestamp(60), realMadrid: 54, draw: 50, barcelona: 46 },
  { time: createTimestamp(65), realMadrid: 54, draw: 50, barcelona: 46 },
  { time: createTimestamp(70), realMadrid: 54, draw: 50, barcelona: 46 },
  { time: createTimestamp(75), realMadrid: 54.5, draw: 50, barcelona: 46 },
  { time: createTimestamp(80), realMadrid: 55, draw: 50, barcelona: 46 },
  { time: createTimestamp(85), realMadrid: 55, draw: 50, barcelona: 51 },
  { time: createTimestamp(90), realMadrid: 55, draw: 50, barcelona: 56 },
];

const Detail = () => {
  const teams = [
    { name: 'realMadrid', label: 'Real Madrid' },
    { name: 'draw', label: 'Draw' },
    { name: 'barcelona', label: 'Barcelona' },
  ];

  return <TeamChart teams={teams} data={sampleData} />;
};

export default Detail;
