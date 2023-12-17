import { Icon } from '@/components';

const GiftButton = () => {
  return (
    <button type="button" className="bg-primary-800 border border-primary-400 rounded-lg px-2 h-10">
      <span className="relative">
        <Icon name="gift-fill" />
        <span className="h-2 w-2 rounded-full absolute right-0 bottom-0 bg-primary-200"></span>
      </span>
    </button>
  );
};

export default GiftButton;
