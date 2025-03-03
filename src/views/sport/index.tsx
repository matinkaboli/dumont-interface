import Card from '@/views/sport/Card';
import { PulsingCircle } from '@/components';

const Sport = () => {
  return (
    <div>
      <div className="flex-between">
        <h1 className="text-2xl font-bold text-white">Game Board</h1>
        <button
          type="button"
          className="h-7 px-3 bg-neutral-750 flex-center gap-1 font-medium text-sm text-white rounded-full"
        >
          <PulsingCircle size="sm" />
          Live
        </button>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-8">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <Card key={item} isActive={item % 2 === 0} />
        ))}
      </div>
    </div>
  );
};

export default Sport;
