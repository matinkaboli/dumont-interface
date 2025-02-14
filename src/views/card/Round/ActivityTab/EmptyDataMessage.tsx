import { Icon } from '@/components';

const EmptyDataMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center gap-5 py-24">
      <div className="flex-center w-14 h-14 rounded-full bg-neutral-750">
        <Icon name="inbox" />
      </div>
      <p className="text-base text-neutral-400">{message}</p>
    </div>
  );
};

export default EmptyDataMessage;
