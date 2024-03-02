import { SvgProps } from '../iconConfig';

function Check({
  width = '20',
  height = '20',
  color = '#ADADB6',
  className,
  viewBox = '0 0 20 20',
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
      <path
        fill={color}
        className="path"
        fillRule="evenodd"
        d="M16.478 5.189a.645.645 0 010 .912l-8.28 8.28a.645.645 0 01-.912 0l-3.764-3.764a.645.645 0 01.913-.912l3.307 3.307 7.823-7.823a.645.645 0 01.913 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Check;
