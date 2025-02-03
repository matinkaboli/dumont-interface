import clsx from 'clsx';

interface Props {
  size?: number;
  color?: string;
  className?: string;
}

const Loading = ({ size = 52, color = '#C319C3', className }: Props) => {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px`, borderColor: color }}
      className={clsx(
        'inline-block animate-spin rounded-full border-2 border-solid border-current !border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_0.1s_linear_infinite]',
        className,
      )}
      role="status"
    >
      <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Loading;
