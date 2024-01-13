interface Props {
  size?: number;
  color?: string;
}

const Loading = ({ size = 52, color = '#A23BEA' }: Props) => {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px`, borderColor: color }}
      className="inline-block animate-spin rounded-full border-2 border-solid border-current !border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_0.3s_linear_infinite]"
      role="status"
    >
      <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Loading;
