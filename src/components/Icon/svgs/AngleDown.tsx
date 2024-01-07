import { SvgProps } from '../iconConfig';

function AngleDown({
  width = '24',
  height = '24',
  color = '#000',
  className,
  viewBox = '0 0 24 24',
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
        d="M4.227 8.227a.774.774 0 011.095 0L12 14.905l6.678-6.678a.774.774 0 111.095 1.095l-7.226 7.225a.774.774 0 01-1.094 0L4.227 9.322a.774.774 0 010-1.095z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default AngleDown;
