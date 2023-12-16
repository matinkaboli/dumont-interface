import { Icon } from '@/components';

const Controller = () => {
  return (
    <div className="flex">
      <button type="button" className="h-6 w-6 rounded-full bg-neutral-700 flex justify-center items-center">
        <Icon name="volume-low" />
      </button>
    </div>
  );
};

export default Controller;
