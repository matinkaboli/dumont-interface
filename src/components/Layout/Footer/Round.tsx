import clsx from 'clsx';

interface Props {
  roundTime?: string;
}

const Round = ({ roundTime }: Props) => {
  const iconStyles = roundTime ? 'bg-primary-400' : 'bg-neutral-500';
  const textStyles = roundTime ? 'text-white' : 'text-neutral-200';
  const labelText = roundTime ? roundTime : 'There is no round';

  return (
    <div className="flex-center-v gap-1">
      <div className={clsx('w-1.5 h-1.5 rounded-full', iconStyles)} />
      <div className={clsx('text-sm font-medium', textStyles)}>{labelText}</div>
    </div>
  );
};

export default Round;
