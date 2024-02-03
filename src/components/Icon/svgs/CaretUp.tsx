import { SvgProps } from '../iconConfig';

function CaretUp({
  width = '8',
  height = '5',
  color = '#EA00FF',
  className,
  viewBox = '0 0 8 5',
}: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      fill="none"
      viewBox={viewBox}
    >
      <path fill={color} className="path" d="M4 .5l3.464 3.75H.536L4 .5z"></path>
    </svg>
  );
}

export default CaretUp;
