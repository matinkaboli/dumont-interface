import Card from '@/views/sport/Card';

const Sport = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Game Board</h1>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-8">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <Card key={item} />
        ))}
      </div>
    </div>
  );
};

export default Sport;
