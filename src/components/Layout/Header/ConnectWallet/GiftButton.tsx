import { Icon } from '@/components';

const GiftButton = () => {
  return (
    <div className="border-primary-gradiant rounded-lg">
      <button type="button" className="bg-primary-800 rounded-lg px-2 h-10">
        <Icon name="gift-rainbow" />
      </button>
    </div>
  );
};

export default GiftButton;
