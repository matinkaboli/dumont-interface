import { SvgProps } from '../iconConfig';

function Icon({
  width = '24',
  height = '24',
  color = '#75757C',
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
        stroke={color}
        className="path"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4.002 12c-.003 1.23-.058 2.907.703 3.534.71.585 1.209.434 2.504.53 1.297.095 4.033 3.906 6.142 2.7 1.088-.855 1.17-2.649 1.17-6.764s-.082-5.909-1.17-6.764C11.242 4.029 8.506 7.84 7.21 7.937c-1.295.095-1.794-.055-2.504.53-.76.626-.706 2.303-.703 3.533z"
        clipRule="evenodd"
      ></path>
      <path
        stroke={color}
        className="path"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18.581 8.314a7.399 7.399 0 010 7.372"
      ></path>
    </svg>
  );
}

export default Icon;
