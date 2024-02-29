import { SvgProps } from '../iconConfig';

function AngleRight({
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
        d="M8.227 19.773a.774.774 0 010-1.095L14.905 12 8.227 5.322a.774.774 0 111.095-1.095l7.225 7.226a.774.774 0 010 1.094l-7.225 7.226a.774.774 0 01-1.095 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default AngleRight;
