import { SvgProps } from '../iconConfig';

function CheckRainbow({ width = '28', height = '20', className, viewBox = '0 0 28 20' }: SvgProps) {
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
        fill="url(#paint0_linear_4603_11999)"
        className="path"
        fillRule="evenodd"
        d="M26.955.378a1.29 1.29 0 010 1.825l-16.56 16.559a1.29 1.29 0 01-1.824 0l-7.527-7.527A1.29 1.29 0 012.869 9.41l6.614 6.615L25.13.378a1.29 1.29 0 011.825 0z"
        clipRule="evenodd"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_4603_11999"
          x1="14.015"
          x2="14.007"
          y1="1.435"
          y2="19.14"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFF00"></stop>
          <stop offset="0.54" stopColor="#FF5BCF"></stop>
          <stop offset="1" stopColor="#7331FF"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default CheckRainbow;
