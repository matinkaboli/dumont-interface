import { SvgProps } from '../iconConfig';

function CircleExclamationFill({
  width = '16',
  height = '16',
  color = '#75757C',
  className,
  viewBox = '0 0 16 16',
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
        d="M8 1.667a6.333 6.333 0 100 12.666A6.333 6.333 0 008 1.666zm.567 9.687V7.13H7.433v4.225h1.134zm.1-5.894a.667.667 0 11-1.334 0v-.007a.667.667 0 011.333 0v.007z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default CircleExclamationFill;
