interface Props {
  className?: string;
  percentage?: number;
  name: string;
  bgColor?: string;
}

const ProgressBar = ({ className, percentage = 100, name, bgColor = '#3B3A45' }: Props) => {
  return (
    <div className={className}>
      <div
        className="h-3 rounded-r-xl"
        style={{ width: `${percentage}%`, backgroundColor: bgColor }}
      />
      <div className="text-xs mt-1">
        <span className="text-white font-bold">{percentage}% </span>
        <span className="text-neutral-400 font-medium">{name}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
