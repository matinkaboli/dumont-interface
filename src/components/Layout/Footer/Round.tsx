interface Props {
  roundTime?: string;
}

const Round = ({ roundTime }: Props) => {
  const baseStyles = 'w-1.5 h-1.5 rounded-full';
  const iconStyles = roundTime ? 'bg-primary-200' : 'bg-neutral-500';
  const textStyles = roundTime ? 'text-white' : 'text-neutral-200';
  const labelText = roundTime ? roundTime : 'There is no round';

  return (
    <div className="flex items-center gap-1">
      <div className={`${baseStyles} ${iconStyles}`} />
      <div className={`${textStyles} text-sm font-medium`}>{labelText}</div>
    </div>
  );
};

export default Round;
