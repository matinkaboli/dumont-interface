import TeamChart from './TeamChart';

const sampleData = [
  { time: '0', realMadrid: 47, draw: 38, barcelona: 42 },
  { time: '5', realMadrid: 47.5, draw: 41, barcelona: 41 },
  { time: '10', realMadrid: 48, draw: 45, barcelona: 40 },
  { time: '15', realMadrid: 50, draw: 48, barcelona: 44 },
  { time: '20', realMadrid: 53, draw: 52, barcelona: 48 },
  { time: '25', realMadrid: 52.5, draw: 52, barcelona: 48 },
  { time: '30', realMadrid: 52, draw: 52, barcelona: 48 },
  { time: '35', realMadrid: 52, draw: 52, barcelona: 48 },
  { time: '40', realMadrid: 52, draw: 52, barcelona: 48 },
  { time: '45', realMadrid: 50, draw: 52, barcelona: 48 },
  { time: '50', realMadrid: 48, draw: 52, barcelona: 48 },
  { time: '55', realMadrid: 51, draw: 51, barcelona: 47 },
  { time: '60', realMadrid: 54, draw: 50, barcelona: 46 },
  { time: '65', realMadrid: 54, draw: 50, barcelona: 46 },
  { time: '70', realMadrid: 54, draw: 50, barcelona: 46 },
  { time: '75', realMadrid: 54.5, draw: 50, barcelona: 46 },
  { time: '80', realMadrid: 55, draw: 50, barcelona: 46 },
  { time: '85', realMadrid: 55, draw: 50, barcelona: 51 },
  { time: '90', realMadrid: 55, draw: 50, barcelona: 56 },
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
